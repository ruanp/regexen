describe("your regexes", function(){

  // CHALLENGE: match an ip address
  it("should match ip addresses", function(){

    // var regex = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    var regex = /^(((2[0-5][0-5])|(1\d?\d?)|([1-9]\d?)|(0))){1}(\.((2[0-5][0-5])|(1\d?\d?)|([1-9]\d?)|(0\d?\d?))){3}$/;

    var tests = [
      ["a.b.c.d", false],
      ["10.0.0.224", true],
      ["192.168.0.1", true],
      ["192.168.0", false],
      ["999.999.999.999", false], // uncomment if you're feeling self-destructive
      ["0.0.0.0", true],
      ["0.1.0.1", true],
      ["255.299.255.222", false],
      ["012.12.12.12", false],
      ["123.123.258.999", false]
    ];

    tests.forEach(function(testData){
      var string = testData[0], shouldMatch = testData[1];
      if(shouldMatch){
        expect(string).toMatch(regex);
      } else {
        expect(string).not.toMatch(regex);
      }
    })
  })

  // CHALLENGE: enforce irritating username rules
  // - must start with a letter.
  // - must be between 4 and 20 characters long.
  // - can only contain letters, spaces, underscores and hyphens.
  it("should filter usernames", function(){

    var regex = /^[a-zA-Z]{1}[a-zA-Z _\-]{3,19}$/;

    var tests = [
      ["shawndrost", true],
      ["007shawndrost", false],
      ["_shawndrost", false],
      ["bro", false],
      ["bros", true],
      ["all killer", true],
      ["all-killer", true],
      ["all_killer", true],
      ["no%filler", false],
      ["a_____--______------", true],
      ["a123", false],
      ["abcdefghijklmnopqrstuvwxyz", false],
      ["abcdefghijklmnopqrst", true]
    ];

    tests.forEach(function(testData){
      var string = testData[0], shouldMatch = testData[1];
      if(shouldMatch){
        expect(string).toMatch(regex);
      } else {
        expect(string).not.toMatch(regex);
      }
    })
  })

  // CHALLENGE: extract text contents of a string with an html tag in it
  // - use lazy matchers.
  // - use match groups to get your result.
  // - don't use non-regex, non-match group techniques here.
  it("should extract text", function(){

    var extractText = function(str){
      var matches = /(.*)<.+>(.*)<.+>(.*)/.exec(str);
      return matches.slice(1,matches.length).join('') /* something to do with matches?? */;
    };

    var tests = [
      ["<p>shawndrost</p>", "shawndrost"],
      ["<p style='asdf'>talkin bout shawndrost</p>", "talkin bout shawndrost"],
      ["shawndrost is <font style='color:red'>rad</font> yo", "shawndrost is rad yo"]
    ];

    tests.forEach(function(testData){
      expect(extractText(testData[0])).toEqual(testData[1]);
    })
  })

  // CHALLENGE: match a decimal number.
  it("should match decimal numbers", function(){

    var regex = /^\-?\d*\.?\d+$/;

    var tests = [
      ["-0.0", true],
      [".", false],
      ["1.", false],
      ["1", true],
      [".023", true],
      ["12.023", true],
      ["a12.023", false],
      ["12.023-", false],
    ];

    tests.forEach(function(testData){
      var string = testData[0], shouldMatch = testData[1];
      if(shouldMatch){
        expect(string).toMatch(regex);
      } else {
        expect(string).not.toMatch(regex);
      }
    })
  })

  // CHALLENGE: given a string and a word, test if the word occurs two
  // times in quick succession (within 3 words) within the string.  You
  // should use regexes, not because they're the best tool -- but because
  // you love pain.
  it("should detect nearby words", function(){

    var containsNearbyWords = function(haystack, needle){
      var regex = new RegExp('(^|\\b)' + needle + '(\\W[\\S]*){0,2}\\W' + needle + '(\\b|$)');
      var matches = haystack.match(regex);
      return matches ? true : false;
    };

    var tests = [
      ["we like regexes because they're regexes", "regexes", true],
      ["regexes are lovely", "potato", false],
      ["we like a regex because of regexes", "regex", false],
      ["regexes, we like, because they're regexes", "regexes", false],
    ];

    tests.forEach(function(testData){
      var haystack = testData[0],
        needle = testData[1],
        expectedResult = testData[2]
        result = containsNearbyWords(haystack, needle);
      expect(result).toEqual(expectedResult);
    })
  })

});
