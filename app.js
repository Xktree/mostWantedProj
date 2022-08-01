/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
        function searchByTraits(people){
        let getTraits = prompt("Would you like to search with single or multiple traits?\n\n Please type in search criteria without spaces then the value.\n Enter multiple traits as separated by a semicolon (no space around the semicolon).\n\n (Ex. Single Criteria: eyecolor brown)\n (Ex. Multiple Criteria: eyecolor brown;weight 175):", chars).toLowerCase()
        
        switch(getTraits){
            case 'gender':
                let getGender = prompt('what gender would you like to search for Male or Female')

            let userTraits =people.filter(function(person){
                if (person.gender === getGender){
                    return true
                
                }});
            console.log (userTraits)
            return userTraits

            case 'height':
                let getHeight = prompt('What height by inches would you like to search by\n Ex: 70')
            let userHeight = people.filter(function(person){
                if (person.height === getHeight){
                    return true
                }});
                console.log(userHeight)
                return userTraits

            case 'weight':
                let getWeight = prompt('What Weight in lbs would you like to search by\n Ex: 170')
            let userWeight = people.filter(function(person){
                if (person.weight === getWeight){           
                return true
            }});
            console.log(userWeight)
            return getTraits

            case 'eyecolor':
                let getEyeColor = prompt('What eyecolor would you like to search for\n Ex: blue')
            let userEyeColor = people.filter(function(person){
                if (person.eyeColor === getEyeColor){
                return true
            }});
            console.log(userEyeColor)
            return getTraits

            case 'occupation':
                let getOccupation = prompt('What occupation would you like to search for\n Ex: programmer')
            let userOccupation = people.filter(function(person){
                if (person.occupation === getOccupation){
                    return true
            }});
            console.log(userOccupation)
            return getTraits

            case 'Date of birth':
                let getDOB = prompt('What DOB would you like to search for\n Ex: 1/18/1949')
            let userDOB = people.filter(function(person){
                if (person.dob === getDOB){
                    return true
            }})

        }

        
        }
searchResults = searchByTraits(people);
console.log(`The following individuals match the search criteria: ${people.firstName} ${people.lastName}`, searchResults);
            break;

    default:
        // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input - switch cases based on user input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function ////////////////////////////////////////// (DONE)
            // HINT: Look for a person-object stringifier utility function to help
            displayPerson(person[0]);
            return mainMenu(person, people);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            parentsFilter(person[0], people);
            siblingFilter(person[0], people);
            spouseFilter(person[0], people);
           return mainMenu(person, people);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
        else{
            return false;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\nLast Name: ${person.lastName}\nGender: ${person.gender}\nDate of Birth: ${person.dob}\nHeight: ${person.height}\nWeight: ${person.weight}\nEye Color: ${person.eyeColor}\nOccupation: ${person.occupation}\n`

    //! TODO #1a: finish getting the rest of the information to display ////////////////////////////////////////// (DONE)
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

// TODO 2: Functions to find family details: parents, siblings, spouse, exception

// Function to return a parent if the individual id matches the index of the id contained within someone else's parents element field

function parentsFilter(person, people){
    let familyMember = people.filter(function(el){
        if(el.id === person.parents[0] || el.id === person.parents [1]){
            return true;
        }
        else{
            return false;
        }
    })
    findPersonFamily(familyMember, "Parent");
}

// Function to return a sibling if the individual has the same parent id number as anyone else in the data set

function siblingFilter(person, people){
    let familyMember = people.filter(function(el){
    let lengthOfParentString = el.parents;
        if(el.id === person.id){
            return false;
        }
        else if(lengthOfParentString < 2){
            return false;
        }
        else if(el.parents[0] === person.parents[0] || el.parents[0] === person.parents[1] || el.parents[1] === person.parents[0] || el.parents[1] === person.parents[1]){
            return true;
        }
        else{
            return false;
        }
    })
    findPersonFamily(familyMember, "Sibling");
}

// Function to return a spouse if the individual has a currentSpouse id that matches anyone else in the database

function spouseFilter(person, people){
    let familyMember = people.filter(function(el){
        if(el.currentSpouse === person.id){
            return true;
        }
        else{
            return false;
        }
    })
    findPersonFamily(familyMember, "Spouse");
}

// Function rule for adding an individual to a array and to account for no familial relations for a certain field for an individual

function findPersonFamily(familyMember, knownRelationship){
    if(familyMember.length < 1){
        alert("There is no individual found for this relations field in our database.")
    }
    else{
        alert(familyMember.map(function(person){
            return knownRelationship + ": " + person.firstName + " " + person.lastName; 
        }).join("\n"));
    }
}

// Function to return a list of descendants - logic similar to parent function 

function findPersonDescendants(familyMember, people){
    let descendants = []

    function findChildren(person){
        let familyMember = people.filter(function(child){
            if(child.parents.includes(person.id)){
                return true
            }
            else{
                return false
            }
        })
        if(familyMember.length > 0){
            for(let i = 0; i < familyMember.length; i++){
                descendants.push(familyMember[i])
                findChildren(familyMember[i])
            }
        }
        else{
            return "This individual has no descendants in our database."
        }
    }
    findChildren(person);
    findPersonFamily(familyMember, "Descendant");
}