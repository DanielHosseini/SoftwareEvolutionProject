	unmatchedOperationName = [];
	lowerCaseClasses = [], upperCaseAttOp = [], upperCaseAttributes = [], checkCase = [], inArray = 0;
	var unMatchedInDb = [];
	uncommonClasses = [], operationCounter = 0,numOperations = 0;

	var classList = [];
	var c, b, attName,  newName, operationName, attName2,attributeName, array3,bar = 0, global, attArray, opCon,
			hasLowercase = false, hasUpperCase = false;
	var errorCounter = 20, combinedMethodsCounter = 0, CombineAttCounter = 0, operationPercent, classPercent,
			fullTotal= 0, testArray, test;

	var countsMethods =0; countsAttributes = 0, countsInheritance = 0;
        

	function initFeedback(XMIString1){
		XMIstring_decoded = decodeURIComponent(XMIstring);
		XMIDoc = $.parseXML(XMIstring_decoded);

		XMIstring_decoded2 = decodeURIComponent(XMIString1);
		XMIDoc2 = $.parseXML(XMIstring_decoded2);

		nv1 = ($(XMIDoc2).find("Class").each(function () {
												 }));

		nv = ($(XMIDoc).find("Class").each(function () {
											   }));

		 attributes1 = XMIDoc.getElementsByTagName('Attribute');
			attributes2 = XMIDoc2.getElementsByTagName('Attribute');
			idealMethod = XMIDoc.getElementsByTagName('Operation');
			studentMethod = XMIDoc2.getElementsByTagName('Operation');
			idealGeneralizations = XMIDoc.getElementsByTagName('Generalization');
			studentGeneralizations = XMIDoc2.getElementsByTagName('Generalization');
			combinedCounter = 0;

			correctNumAttSolution = 0;
			/*Counters for percentage calculations
			 * */
			fullTotal =  nv.length  + attributes1.length +  idealMethod.length;
			// + attributes1.length + nv.length

			numClasses2 =nv.length, classCounter2 = 0, operationCounter2 = 0 ;
			fullPercent = 0;

	}

   function matchClasses() {
            var synonyms, totalCorrectClasses, b, iName, sName;
            completeClasses = [], commonClasses = [], unMatchedClasses = [], studentClass = [], idealClass = [], idealClassLowerCase = [];
            
            /*Pushing all class names from both files and storing them in arrays.
            * */

            for(var i = 0; i < nv.length; i++){
                iName = $(nv[i]).attr('name');
                idealClass.push(iName);
				
				//console.log(idealClass[i]);  //Solution appears on the console. | By Hasan Fatih ŞİMŞEK - Intern
            } 

			// By Intern Hasan Fatih ŞİMŞEK
            for(var i = 0; i < idealClass.length; i++){
				idealClassLowerCase.push(idealClass[i].toLowerCase());
				//console.log(idealClassLowerCase[i]);
			}


            for(var j=0; j< nv1.length; j++){
                sName = $(nv1[j]).attr('name');
                studentClass.push(sName);
            }
            

            /*
             * Comparing the two arrays for common classes, and deleting matched class in student array
             */

			// An Explanation By Hasan Fatih ŞİMŞEK - Intern
			// The indexes' start points were started from last element to avoid nasty effect of splice method. 
			// If the indexes's start points had been started from first element, the for continuation condition 
			// limit would have be a variable, such as studentClass.length. It would be bad, because it is a variable, 
			// That is, the studentClass.length decreases when splice method removes an element from studentClass. Because 
			// for loop iteration limit can change, the for loop may not completely scan all elements of studentClass. To
			// prevent this nasty effect of splice method, I used in the following solution.
            for (var i = idealClass.length - 1; i >= 0; i--) {
                for (var j = studentClass.length - 1; j >= 0; j--) {
                    if ( idealClass[i].toLowerCase() === studentClass[j].toLowerCase() ){
                        classCounter2 = classCounter2 +1;
                        attName = idealClass[i];
                        commonClasses.push(attName);
                        studentClass.splice(studentClass.indexOf(studentClass[j]), 1);
                    }
                }
            }
            
            

            var common = [];
            $.each(commonClasses, function(i, e) {
                if ($.inArray(e, common) == -1) common.push(e);

            });
            
            


            /*Checks rejected class names for uppercase first letter. Stores all lowercase names in lowerCaseClasses array.
             * */

            matchedInDb = [];
            var  attName2;
            var classes = TAFFY([{name: "Tanks"}, {name: "Tanker"},{name: "ShermanTank"},
                {name: "Sherman_Tank"},{name: "ShermanTank"},{name: "Sherman"},
                {name: "CenturionTank"},{name: "Centurion_Tank"},{name: "Centurion_tank"},
                {name: "PanzerTank"}, {name: "Panzer_Tank"},{name: "Silver_Bullets"},{name: "IPlayer"},
                {name: "I_Player"},{name: "Panzer"}, {name: "PlayerControl"}, {name: "PlayerController"},
                {name: "Worlds"}, {name: "Level"}, {name: "level"},{name: "Levels"}, {name: "Levels"},
                {name: "Scores"}, {name: "Scoreboards"}, {name: "Metal_Bullets"},{name: "MetalBullet"},
                {name: "drive"}, {name: "Gold_Bullet"}, {name: "Gold_Bullets"},{name: "GoldBullets"},
                {name: "Metal_Bullets"},{name: "PlayerInterface"}, {name: "ScoringBoard"},{name: "ScoreBoard"}]);
                query = classes().select("name");
            
            
            /*
            // EXPLANATION FOR OLD CODE EXTRACT (By Hasan Fatih ŞİMŞEK - Intern)
            // ------------------------------------------------------------------------
			// Suppose that studentClass.length = 3; These are CenturionTank, Tank, Shell.
			// studentClass.length decreases in the if condition inside the inner for loop (!)
			// Because of this, studentClass.length is being 2 after first iteration. Thereby 
			// outer for loop will run totaly two times, not three. As a result, the studentClass
			// array cannot be empty array, and because of this feedback balloon cannot show one
			// class among CenturionTank, Tank, Shell. Normally we expect that the 
			// outer for loop runs three times. But because the continuaion condition limit is 
			// a variable value, studentClass.length, the outer loop runs just two time rather 
			// than three times due to splice method.
            for (var j = 0; j < studentClass.length; j++) { 
				
                for (var i = 0; i < query.length; i++) {
                    
                    if (studentClass[j] === query[i]) {
						
                        attName2 = studentClass[j];
                        matchedInDb.push(attName2);
                        studentClass.splice(studentClass.indexOf(studentClass[j]), 1); // CenturionTank couldn't be removed from studentClass.
                        classCounter2 = classCounter2 + 1;
						
                    }
                   
                }
                
                //console.log(studentClass.length);
                
            }
			*/
            
            
            
            // @ By Hasan Fatih ŞİMŞEK - Intern
            // After splice() process, "some" indexes of values of studentClass "can" change. Because 
            // of this, we should scan the elements reversely. Thereby, we can always use unchanged index
            // even if deleting process is carried out with splice() method. This process just affects the 
            // indexes of scanned elements, not to be scanned elements' indexes.
            for(var i = query.length - 1; i >= 0; i--){
				for(var j = studentClass.length - 1; j >= 0; j--){	
					if ( query[i].toLowerCase() == studentClass[j].toLowerCase() ) {	
						attName2 = query[i];
						matchedInDb.push(attName2);
						studentClass.splice(studentClass.indexOf(studentClass[j]), 1);
						classCounter2 = classCounter2 + 1;
						
					}
				}
			}
			
			
			
			//array3 = commonClasses;
            array3 = commonClasses.concat(matchedInDb); // All classes which were removed from studentClass array.
			
			
			//return array3.toString();
			
            var unique = [];
            for (var i = 0; i <  array3.length; i++) {
                var current =  array3[i];
                if (unique.indexOf(current) < 0) unique.push(current);
            }
			
			

			// I think the following code is redundant. Because we have 
			// already eliminate the studentClass array with both idealClass 
			// and query array. 
            for(var i=0; i< unique.length; i++){
                for(var j= 0; j < studentClass.length; j++){
					
					//return array3[2];
					
                    if(unique[i] == studentClass[0]){
                        studentClass.splice(studentClass.indexOf(studentClass[j]), 1); // It was 0, not 1 !
					}
                }
            }

			

            completeClasses.push(unique);
            totalCorrectClasses = classCounter2;
            combinedCounter = 0;

            for(var i=0; i <  unique.length; i++){
                combinedCounter = combinedCounter + 1;
            }

            var per = (Math.floor((combinedCounter/nv.length) * 100));
			
			
			
			if (per == 0){
				return("You're still at the beginning of the road");
			}
			
			if( per < 10 && per > 0 && studentClass.length == 0){
				return("Clasess " + unique.join(", ") + " look good. But you need more and more classes.");
			}
            if (per < 10 && per > 0) {
                return("There is/are some wrong class(es). Please read your assignment text again, correct them and find more classes.");
            }
            
            if (per >= 10 && per < 50 && studentClass.length == 0) {
				return("Clasess " + unique.join(", ") + " all look good. Go on! You need some more classes.");
			}
            if (per >= 10 && per < 50 && studentClass.length > 0) {
                return("You have a few things that need fixing. Classes " + unique.join(", ") + " " +
                "look good but you are still missing some important classes. Read the task carefully " +
                "and see if you can find classes by identifying  nouns, preferably complete singular nouns.");
                if (hasLowercase == true) {
                    return("Looks like some of your class names e.g (" + lowerCaseClasses + ") start with a lower case letter. " +
                    "All class names must start with an upper case letter e.g Ocicat.");
                }
            }
            
            if (per >= 40 && per < 80 && studentClass.length == 0) {
                return("Classes " + unique.join(", ") + " <b>all</b> look good, but some important classes are still missing. Read the task carefully " + 
                "and see if you can fin classes by identifying nouns, preferably complete singular nouns.");
            }
            if (per >= 40 && per < 80) {
                return("Your classes " + unique.join(", ") + " look good, but there are some wrong classes. Correct them and find other important classes. They are still missing. Read the task carefully " +
                "and see if you can find classes by identifying  nouns, preferably complete singular nouns.");
            }
            
            if(per > 80 && per < 100 && studentClass.length == 0){
				return("You are great. All classes " + unique.join(", ") + " look good. But there are so little missing classes.");
			}
            if (per > 80 && per < 100) {
                return("You managed to identify most of the class names. But some wrong class(es) take part in your screen.");
            }
            if (per == 100){
                return("You have all the necessary class names.")
            }
            //return array3;

            //Taffydb collection of possible Class names that can be compared for matches.They so far include:
        }


        //Retrieves and matches class names from  both files. Matched classes are displayed

        /*Retrieve and match functions from  both files.
         * */


        function matchOperations() {
            var unMatchedOperations = [], commonOperations = [], b, notFound = [];
            var methods = TAFFY([{name: "Move"},{name:"Switching bullets"},{name:"switchBullet"}, {name: "switch_Bullets"},
                {name: "switch_Bullet"}, {name: "switchAmmo"},{name: "forwards"},{name: "forward"},{name: "moveForward"},{name: "moveForwards"},
                {name: "int Score"}, {name: "Fire()"}, {name: "Switching bullets"},{name: "steer()"},
                {name: "Steer"},{name: "steer"},{name: "drive"},{name: "play"},{name: "notify_kill"}, {name: "fire"}, {name: "Switching bullets"},
                {name: "fire()"},{name: "fire()"}]);
            var correcNumtOperations =0, newArray;
            var query = methods().distinct("name");
            var matchOpsInDb = [], lowCase = false;


			console.log ( studentMethod.length );

            //checks both files
            for (var i = 0; i < idealMethod.length; i++) {
                for (var j = 0; j < studentMethod.length; j++) {
                    if (($(idealMethod[i]).attr('name') == $(studentMethod[j]).attr('name'))) {
                        operationName = studentMethod[j].getAttribute('name');
                        commonOperations.push(operationName);
                    }
                }
            }

            //find non-matches in both files
            for (var i = 0; i < idealMethod.length; i++) {
                for (var j = 0; j < studentMethod.length; j++) {
                    if (($(idealMethod[i]).attr('name'))  !==($(studentMethod[j]).attr('name'))) {
                        unmatchedOperationName = $(studentMethod[j]).attr('name');
                        unMatchedOperations.push(unmatchedOperationName);
                    }
                }
                break;
            }

			//goes through synonym checks and stores matched data in matchOpsInDb.
            for (var i = 0; i < query.length; i++) {
                for (var j = 0; j < unMatchedOperations.length; j++) {
                    if (query[i] === unMatchedOperations [j]) {
                        // combinedCounter = combinedCounter + 1;
                        newName = unMatchedOperations [j];
                        matchOpsInDb.push(newName);
                        operationCounter = operationCounter + 1;
                    }
                    if (query[i] !== unMatchedOperations [j]){
                        b = unMatchedOperations [j];
                    }

                }
                notFound.push(b); break
            }

            methodArray = matchOpsInDb.concat(commonOperations);
            for (var i=methodArray.length - 1; i >=0; i--) {
                if (methodArray[i] === undefined) {
                    methodArray.splice(i, 1);
                }
            }
			
			//This loop removes duplicate operation names
            var uniqueMethods = [];
            for (var i = 0; i <   methodArray.length; i++) {
                var current =   methodArray[i];
                if (uniqueMethods.indexOf(current) < 0) uniqueMethods.push(current);
            }
            for(var i in uniqueMethods){
                countsMethods = countsMethods + 1;
            }
            //checkLowerCase(methodArray);
            lowCase = checkLowerCase(uniqueMethods); //return true if names start with uppercase letter

            correcNumtOperations = operationCounter;


            var per = (Math.floor((countsMethods/ idealMethod.length) * 100)); // document.write( methodArray);
            operationCounter = 0; //Resets operationCounter to zero.

            var shortList;
            shortList = uniqueMethods.slice(0,3);

            for(var i =0; i < uniqueMethods.length; i++){
                for(var j=0; j < notFound.length; j++){
                    if(uniqueMethods[i] === notFound[j])
                        notFound.splice(notFound.indexOf(notFound[j]),1);
                }
            }
            //feedback output
			/*
            if(lowCase ==  true){
                return ("Looks like some of your method name(s) (i.e " + upperCaseAttOp + ") start with an upper case letter. " +
                "All method names must start with a lower case letter e.g sum().");
            }*/


            if(per == 0){
				//return ("You should
			}
            if ((per > 20 && per <= 75 && notFound.length > 0)){
                return ("Your method names "  + uniqueMethods + " look good but you might want to add more methods. " +
                "Try deleting or renaming the method name(s) " +  notFound + ". Read the task carefully and look for strong verbs to find the right method names.");
            }
            if (per > 75 && per <= 100) {
                return ("The method names " + shortList + " ... look really good." );
            }

            if (per == 100) {
                return ("Your method names look very good!" );
            }

        }

        function matchAttributes() {
            var a, b; var commonAttributes = [], unMatchedAttributes = [], matchedAttributesInDb = [], notFoundInDb = [];
            var attributesyn = TAFFY([{name: "ammo"}, {name: "Ammo"},{name: "bullet_Type"},{name: "Bullet_Type"},
                {name: "unvisited_worlds"},{name: "Unvisited_worlds"}, {name: "unvisitedWorlds"},{name: "visitedWorlds"},{name: "Score"}, {name: "Tanks_destroyed"},
                {name: "score"}, {name: "visitedWorlds"}, {name: "listOfWorldsVisited"},{name: "-String Panzer"},
                {name: "tanks_destroyed"},{name: "tanksDestroyed"},{name: "TanksDestroyed"}, {name: "bullet"},{name: "bullets"},
                {name: "Bullet"},{name: "Bullets"}]);
            var query = attributesyn().select("name");
            var att, lowCase = false, attributeName2, correctNumAttSolution = 0;
            TotalCorrect = 0;
			
			//console.log("Length: " + attributes1.length); // Output : 3 | By Intern, Hasan Fatih ŞİMŞEK 
			//console.log("Length: " + attributes2.length); // Output : 0 | By Intern, Hasan Fatih ŞİMŞEK
			
            //Match attributes in both files
            for (var i = 0; i < attributes1.length; i++) {
                for (var j = 0; j < attributes2.length; j++) {
                    if (($(attributes1[i]).attr('name')=== $(attributes2[j]).attr('name'))) {
                        correctNumAttSolution = correctNumAttSolution + 1;
                        attributeName = attributes2[j].getAttribute('name');
                        commonAttributes.push(attributeName);
                    } else {
                        unMatchedAttributes.push(attributes2[j].getAttribute('name'));
                        b = attributes2[j].getAttribute('name');
                    }
                }
            }


            //Match attributes in student file and Db
            var newArray = unMatchedAttributes.slice(0);


			// console.log(newArray.length); // Output : 0  | By Intern, Hasan Fatih ŞİMŞEK
			
            for (var i = 0; i < query.length; i++) {
                for (var j = 0; j <  newArray.length; j++) {
                    if (query[i] ===  newArray[j]) {
                        correctNumAttSolution = correctNumAttSolution + 1;
                        att = query[i];
                        matchedAttributesInDb.push(att);
                        newArray.splice(newArray.indexOf(newArray[j]),1);
                    }
                }
            }


            var wrongAtt = [];
            for (var i = 0; i <  newArray.length; i++) {
                var current =  newArray[i];
                if (wrongAtt.indexOf(current) < 0) wrongAtt.push(current);
            }



            //join matched array element
            attArray = commonAttributes.concat(matchedAttributesInDb);

            //Remove duplicate attribute names
            var uniqueAtt = [];
            for (var i = 0; i <  attArray.length; i++) {
                var current =  attArray[i];
                if (uniqueAtt.indexOf(current) < 0) uniqueAtt.push(current);
            }
            for(var i in uniqueAtt){
                countsAttributes = countsAttributes + 1;
            }
            lowcase  = checkLowerCaseAtt(uniqueAtt);
            per = correctNumAttSolution;
            
            //console.log("per : " + per);
            
            correctNumAttSolution = 0;
            var per = (Math.floor((countsAttributes/ attributes1.length) * 100));


            for(var i =0; i< uniqueAtt.length; i++){
                for(var j=0; j< wrongAtt.length; j++){
                    if(uniqueAtt[i] === wrongAtt[j]){
                        wrongAtt.splice(wrongAtt.indexOf(wrongAtt[j]),1);
                    }
                }
            }


            if(lowCase == true){
                return (" Your attribute names (i.e " + upperCaseAttributes + ") start with an upper case letter.");
                console.log(upperCaseAttributes)
            }

            if ((per > 0 && per <= 75) || (per > 10 && wrongAtt.length > 0 && per < 50)) {
                return("Your class attribute names " + uniqueAtt.join(", ") + " " +
                "look good but some important attributes are missing. Consider renaming attribute(s) " + wrongAtt + " " +
                " Name your attributes with a domain-based noun");
            }
             if (per > 75 && per <= 100) {
                return(" Your attributes: " + uniqueAtt + " look.");
            }
           /* var typeAsAtt = TAFFY([{name: "Tanks"}, {name: "Tanker"}, {name: "Silver_Bullets"},{name: "IPlayer"}, {name: "I_Player"}, {name: "i_Player"},
                {name: "PlayerControl"}, {name: "PlayerController"}, {name: "Worlds"}, {name: "Level"}, {name: "level"},
                {name: "Levels"}, {name: "Levels"}, {name: "Scores"}, {name: "Scoreboards"}, {name: "Metal_Bullets"}
                , {name: "drive"}, {name: "Gold_Bullet"}, {name: "Gold_Bullets"},{name: "+Bullet type"},{name: "+Type"},{name: "+type"},{name: "-Type:String"},
                {name: "-Type"},{name: "+bullet_type"},{name: "+Bullet"},{name: "+Bullets"},{name: "+Scoreboard"},{name: "tank_type:string"},{name: "-tankType"},
                {name: "+Metal_Bullets"},{name: "+Silver_Bullets"},{name: "+Metal_Bullet"},{name: "+TankType"},{name: "+TankLevel"},{name: "+BulletsTypes"},
                {name: "+BulletType"}]);

            query2 = classes().select("name");*/

        }

        function StudentGeneralizationDirection() {
            var studentGenList, studentClaList, parentClass, parentClass, kaList = [],
                    checked = [], checked1 = [];
            for (var i = 0; i < studentGeneralizations.length; i++) {
                for (var j = 0; j < nv1.length; j++) {
                    studentGenList = studentGeneralizations[i].getAttribute('parent');
                    studentClaList = nv1[j].getAttribute('xmi.id');
                    if (studentGenList === studentClaList) {
                        parentClass = nv1[j].getAttribute('name');
                        kaList.push(parentClass);
                    }
                }
            }

            var result = [];
            $.each(kaList, function(i, e) {
                if ($.inArray(e, result) == -1) result.push(e);

            });

            return result;
            // console.log("Parent class(es) in student solution: " + kaList.join());
            //  return kaList;
        }
        function idealGeneralizationDirection() {
            var idealGenList, idealClaList, parentClass, iList = [];

            for (var j = 0; j < nv.length; j++) {
                for (var i = 0; i < idealGeneralizations.length; i++) {
                    idealGenList = idealGeneralizations[i].getAttribute('parent');
                    idealClaList = nv[j].getAttribute('xmi.id');
                    if (idealGenList === idealClaList) {
                        parentClass = nv[j].getAttribute('name');
                        iList.push(parentClass);
                        break;
                    }
                }
            }
            inArray =  iList.length;
            return iList;
        }


        function compareGeneralizations() {
            var   kaList = StudentGeneralizationDirection();
            var  iList =  idealGeneralizationDirection(), matchedClass;


            var count = 0, countDown = iList.length, checked = [], checked1 = [],parentClasses = [];
            for (var i = 0; i < kaList.length; i++) {
                for (var a = 0; a < iList.length; a++) {
                    var a = iList[a];
                    var b = kaList[i];
                    if (a == b) {
                        matchedClass = b;
                        break;
                    }
                    else if ((kaList[i] !== iList[a])) {
                        checked1.push(kaList[i]);
                    }
                }
                checked.push(b);
            }


            var result = [];
            $.each(checked, function (i, e) {
                if ($.inArray(e, result) == -1) result.push(e);

            });

            for (var x = 0; x < result.length; x++) {
                countsInheritance = countsInheritance + 1;
            }


            //  return result;

            var half = iList.length/2;
            // per = (Math.floor((studentInheritanceCounter/inheritanceCounter) * 100));
            if(result.length < 0){
                return("You solution does not contain inheritance. The your solution must contain some occurrences of inheritance.")
            }
            if (result.length > 1 && result.length <= half){
                return("You have too few inheritance classes in your solution. Check the assignment text again for " +
                " more possible inheritance classes or rename your inheritance classes.");
            }
            if(result.length == iList.length){
                return("Nice work with your inheritance classes, parent class name(s) '" + result + "' look pretty good!");
            }

        }

        function showAllClasses() {
            for (var i = 0; i < nv.length; i++) {

                attName = nv[i].getAttribute('name');
                classList.push(attName);
            }

            console.dir("Ideal class names: " + classList.join() + " . ");
        }
        function getIdealClasses() {
            return XMIDoc.getElementsByTagName('Class');
        }

        function NumberOfClasses() {
            var numberOfClasses = 0;
            var classes = XMIDoc.getElementsByTagName('Class');
            for (var i = 0; i < classes.length; i++) {
                ++numberOfClasses;
            }
            console.dir("Total number of classes in ideal solution: " + numberOfClasses);
            return numberOfClasses;
        }
        /*Returns a collection of classes
         *along with the class elements
         */
        function getStudentClasses() {
            return XMIDoc2.getElementsByTagName('Class');
        }

        /*Compares the number of elements found in the from ideal
         *solution with number of elements from student solution.
         */
        function compare(element) {
            var idealElement = idealValues(element);
            var b = studentValues(element);
            if (idealElement == b) {
                document.write("number of elements match");
            } else {
                document.write("Number of elements not equal");
            }
        }
        /*Get number of elements (i.e class, attributes,
         *associations etc) from student solution.
         */

        function studentValues(element) {
            var i;
            classArray = XMIDoc2.getElementsByTagName(element);
            for (i = 0; i < classArray.length; i++) {
            }
            return i;
        }

        /*Get number of elements (i.e class, attributes,
         *associations etc) from ideal solution.
         */

        function idealValues(element) {
            var i;
            classArray = XMIDoc.getElementsByTagName(element);
            for (i = 0; i < classArray.length; i++) {
            }
            return i;
        }

        /*Get Attributes and Operations from two files
         */
        function getClassifiers() {
            var classifierArray1, classifierArray2;

            classifierArray1 = XMIDoc.getElementsByTagName("Classifier.feature");

            classifierArray2 = XMIDoc2.getElementsByTagName("Classifier.feature");

            return (classifierArray1, classifierArray2);
        }


        /* //call find to get a collection of all ssociations
         */

        function getAllAssociations() {
            return $(XMIDoc).find("Association").each(function () {
            });
        }

        function getElementAt() {
            return XMIDoc.getElementsByTagName('Class')[0];
        }

        //get element by class name
        function getClassByName(elem) {
            return XMIDoc.getElementsByName(elem);
        }

        /*UpperCase letter check for UML Class names
         * */
        function checkUpperCase(elem) {

            for (var i = 0; i < elem.length; i++) {
                if (elem[i].charAt(0) == elem[i].charAt(0).toUpperCase()) {
                    lowerCaseClasses.push(elem[i]);
                    if (lowerCaseClasses.length > 0) {
                        hasLowercase = true;
                    }else{
                        hasLowercase = false;
                    }
                }
            }
            return hasLowercase;
        }

        function checkLowerCase(elem) {
            var hasUpperCase = false;
            for (var i = 0; i < elem.length; i++) {
                if (elem[i].charAt(0) == '+') {
                    if (elem[i].charAt(1) === elem[i].charAt(1).toUpperCase()) {
                        upperCaseAttOp.push(elem[i]);
                        if (upperCaseAttOp.length > 0) {
                            hasUpperCase = true;
                        } else {
                            hasUpperCase = false;
                        }
                    }
                }
                else {
                    if (elem[i].charAt(0) === elem[i].charAt(0).toUpperCase()) {
                        upperCaseAttOp.push(elem[i]);
                        if (upperCaseAttOp.length > 0) {
                            hasUpperCase = true;
                        } else {
                            hasUpperCase = false;
                        }
                    }
                }
            }
            return hasUpperCase;
        }

        function checkLowerCaseAtt(elem) {

            for (var i = 0; i < elem.length; i++) {
                if (elem[i].charAt(0) == '-') {
                    if (elem[i].charAt(1) === elem[i].charAt(1).toUpperCase()) {
                        upperCaseAttributes.push(elem[i]);
                        if (upperCaseAttributes.length > 0) {
                            hasUpperCase = true;

                        }else{
                            hasUpperCase = false;
                        }
                    }
                }else{
                    if (elem[i].charAt(0) === elem[i].charAt(0).toUpperCase()) {
                        upperCaseAttOp.push(elem[i]);
                        if (upperCaseAttOp.length > 0) {
                            hasUpperCase = true;
                        } else {
                            hasUpperCase = false;
                        }
                    }
                }
            }
            return hasUpperCase;
        }

		function attributeProgress(){
             var AttributeProgress =  Math.round((countsAttributes *100)/ attributes1.length);
        }

        function globalPercent() {

            var counted = combinedCounter + countsAttributes + countsMethods;
            idealTotal = fullTotal;

            progress = Math.round((counted * 100) / idealTotal);
            //document.getElementById("bar").style.width = progress + '%';
            //document.getElementById("progress").innerHTML = 'Progress so far ' + progress + '%';
            combinedCounter = 0, countsMethods = 0, countsAttributes = 0, inArray = 0;
            return progress;
        }

        function hints(){
             var hint = "Make sure that your class names all start with an uppercase letter. Check that you have all important methods and" +
                    "attributes and classes. If this doesn't help, press the Tips button to get some helpful UML tips."
            return hint;
        }

        function sendEvaluation() {

            var finalArray = [matchClasses(),matchOperations(), matchAttributes(),compareGeneralizations()]; // ["some feedback", "another feedback", ... ]

            globalPercent();
            for (var i=finalArray.length - 1; i >=0; i--) {
                if (finalArray[i] === undefined) {
                    finalArray.splice(i, 1);
                }
				//console.log(finalArray[i]);
            }
            
            finalArray = "<span class='longFeedback'>" + finalArray + "</span>";
            
            return finalArray; // Return string array as an argument of updateAvatar() function.
            
            
        }


        function sendEvalAsJson() {
            jsonobject = ({"message" : matchClasses(), "progress" : globalPercent()});
            return jsonobject;
        }


