Feature: Reading Test Data From Feature File
Background: Common steps
Given I Launch the browser
Then I Launch the test automation practice application


  @method45
  Scenario Outline: verify reading testdata from feature file with scenario keyword
 And I verify reading testdata from feature file with scenario keyword "<Name>","<Email>","<Phone>","<Address>","<Wikipedia>"
   

    Examples:
      | Name       | Email                | Phone      | Address   | Wikipedia  |
      | Quality    | Quality@gmail.com    | 8908908900 | hyderabad | testing    |
      | playwright | playwright@gmail.com | 6789067890 | bangalore | selenium   |
      | screen     | screen@gmail.com     | 5678907890 | chennai   | javascript |

  @method55
  Scenario Outline: verify reading testdata from feature file with scenario outline keyword
    And I verify reading testdata from feature file with scenario outline keyword "<Name>","<Email>","<Phone>","<Address>","<Wikipedia>"
    

    Examples:
      | Name      | Email                | Phone      | Address   | Wikipedia  |
      | tuesday   | Quality@gmail.com    | 8908908900 | hyderabad | testing    |
      | wednesday | playwright@gmail.com | 6789067890 | bangalore | selenium   |
      | thrusday  | screen@gmail.com     | 5678907890 | chennai   | javascript |
