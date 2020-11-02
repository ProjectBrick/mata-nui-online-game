'use strict';

// CommonJS module made from code here:
// https://web.archive.org/web/20030211195851id_/http://www.lego.com:80/eng/bionicle/assembler.asp?pageid=support&contid=matanuitips

var Sections = new Array()

var arrAnswers						//temporary array of answers used to setup section objects
var arrQuestions					//temporary array of question objects used to setup section objects
var myQuestion						//temporary question object variable used to setup section objects

function hintSections(){
	this.text = ''
	this.layer=null
	this.questions = null
	this.setSection = function(){
		if(arguments[0]){this.text=arguments[0]}
		if(arguments[1]){this.questions=arguments[1]}
	}
}

function hintQuestion(){
	this.text = ''
	this.answers=null
	this.setQuestion = function(){
		if(arguments[0]){this.text=arguments[0]}
		if(arguments[1]){this.answers=arguments[1]}
	}
}

arrQuestions = new Array()
arrAnswers = new Array()
arrAnswers[0] = 'Looks like somebody came out of it and walked away.'
arrAnswers[1] = 'Maybe you should follow the footprints?'
arrAnswers[2] = 'This is where Tahu arrived on Mata Nui. He headed towards the Burnt Forest. If you have the Storybook, you can see what happened next...'
myQuestion = new hintQuestion()
myQuestion.setQuestion('What\'s that big canister doing there?',arrAnswers)
arrQuestions[0] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Hmm, it looks like you should be able to get in there, doesn\'t it?'
arrAnswers[1] = 'But you can\'t. Not right now, at any rate... the stone faces are a great mystery.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('How can I get into the big stone face on the beach?',arrAnswers)
arrQuestions[1] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'That was the Legend of Mata Nui, which is told using stones across the island.'
arrAnswers[1] = 'Perhaps one of the Turaga can tell you more.'
arrAnswers[2] = 'You can also learn more about the Legend on one of the Bionicle CD-ROMs.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('What was that strange movie with all the stones falling from the sky?',arrAnswers)
arrQuestions[2] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Have you tried clicking on the gem?'
arrAnswers[1] = 'Have you tried clicking on the pedestal underneath the hook?'
arrAnswers[2] = 'There is someone in the village of Ga-Koro who knows more about these things.'
arrAnswers[3] = 'The green gem is a telescope of sorts, that lets you see the starry sky above Mata Nui.'
arrAnswers[4] = 'The pedestal shows scenes from the prophecies kept by the Turaga, and each scene is connected to a certain constellation in the sky.'
arrAnswers[5] = '"When the Red Star is exactly where it is shown in one of the pictures, then a prophecy may come true."'
myQuestion = new hintQuestion()
myQuestion.setQuestion('What is the green gem on the hook for, the one at the edge of the cliff?',arrAnswers)
arrQuestions[3] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Maybe you should talk to her.'
arrAnswers[1] = 'Maybe you should agree to help her?'
arrAnswers[2] = 'If you agree to help Maku, you will be journey to Ga-Koro automatically. You might want to hear about what happened first, though.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('There\'s someone here with a boat, waving at me and asking me for help!',arrAnswers)
arrQuestions[4] = myQuestion
Sections[0] = new hintSections()
Sections[0].setSection('On the Beach',arrQuestions)

arrQuestions = new Array()
arrAnswers = new Array()
arrAnswers[0] = 'That\'s the village of Ta-Koro over there. The guards and other travelers must have some way of getting back inside.'
arrAnswers[1] = 'You might want to check around the gate area, where the guards are patrolling.'
arrAnswers[2] = 'There\'s a staircase on one side of the archway where the guards are.'
arrAnswers[3] = 'In the guardhouse up the stairs, you can talk to Jala, Captain of the Guard. But there\'s another room behind him.'
arrAnswers[4] = 'In the room behind Jala, click on the big machine and watch it work.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('How do I get across the big lava pit?',arrAnswers)
arrQuestions[0] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Those are private dwellings of the Ta-Koro Matoran. I don\'t think they\'d want you in there.'
arrAnswers[1] = 'You might want to talk to Vakama, Turaga of Ta-Koro, for more information.'
arrAnswers[2] = 'The Matoran of Ta-Koro don\'t seem to like you for some reason!'
myQuestion = new hintQuestion()
myQuestion.setQuestion('Why can\'t I go into the rooms in the back?',arrAnswers)
arrQuestions[1] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'It\'s broken.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('Why can\'t I use the cablecar at the top of the cliff stairs?',arrAnswers)
arrQuestions[2] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Forests are dark and confusing places, but maybe you can keep track of where you\'re going.'
arrAnswers[1] = 'You don\'t have anything with you that you could use, but there are plenty of trees around.'
arrAnswers[2] = 'If you click on a tree, you\'ll make a marking there.'
arrAnswers[3] = 'Use the markings to keep track of which paths you\'ve already gone down. Eventually you\'ll find your way out.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'m lost in the forest.',arrAnswers)
arrQuestions[3] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Lots and lots of blackened trees.'
arrAnswers[1] = 'You might run across someone else wandering in there.'
arrAnswers[2] = 'Kapura is practicing in the forest. There\'s nothing else to find there for now.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('What is there to find in the forest?',arrAnswers)
arrQuestions[4] = myQuestion
Sections[1] = new hintSections()
Sections[1].setSection('Ta-Koro',arrQuestions)

arrQuestions = new Array()
arrAnswers = new Array()
arrAnswers[0] = 'This gate looks kind of complicated. Maybe there\'s some way to open it from outside?'
arrAnswers[1] = 'There\'s a big shell hanging to the right of the gate, and a bunch of stones on the ground.'
arrAnswers[2] = 'Try putting the stones in the shell.'
arrAnswers[3] = 'Look carefully at what happens to the gate when you put a stone in the shell.'
arrAnswers[4] = 'The dial at the top of the gate moves.'
arrAnswers[5] = 'Put just enough stones in the shell to get the two blue dots on the dial to line up. The larger stones will move the dial further than the smaller stones.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('The gate is closed, how do I get in?',arrAnswers)
arrQuestions[0] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Have you looked in all the houses?'
arrAnswers[1] = 'Have you looked underwater?'
arrAnswers[2] = 'If you go underwater, you can see a submerged hut.'
arrAnswers[3] = 'The villagers and their Turaga, Nokama, are trapped in that hut.'
arrAnswers[4] = 'You can\'t talk to them from down there, you\'ll have to find a different way.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('Where are all the villagers?',arrAnswers)
arrQuestions[1] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'You\'re a visitor to this village, but maybe one of the villagers knows what to do.'
arrAnswers[1] = 'All the villagers are trapped underwater. You\'ll have to figure out how to talk with them.'
arrAnswers[2] = 'There\'s a lily pad with a strange machine, just to the left of the hut that leads you underwater.'
arrAnswers[3] = 'If you go to this lily pad, there\'s a little tube at the left edge.'
arrAnswers[4] = 'If you click on the tube, you can talk with Nokama, who has some ideas on what to do.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('How do I rescue the villagers?',arrAnswers)
arrQuestions[2] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Try pressing the button!'
arrAnswers[1] = 'Oops, nothing happened. Looks like something\'s missing in the middle there.'
arrAnswers[2] = 'You need to find the missing gear. If it\'s not on the machine, maybe it fell...'
arrAnswers[3] = '... into the water. It\'s on the ocean floor somewhere.'
arrAnswers[4] = 'It\'s pretty dark down there, but Nokama might be able to help you.'
arrAnswers[5] = 'You need Nokama\'s lightstone, which is in one of the huts. It will illuminate the darkness underwater.'
arrAnswers[6] = 'Once you\'ve found the missing gear, put it in the machine and press the button!'
myQuestion = new hintQuestion()
myQuestion.setQuestion('How do I repair the machine?',arrAnswers)
arrQuestions[3] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'It\'s much easier to carry stuff when you have something to carry it in.'
arrAnswers[1] = 'Look around the village.'
arrAnswers[2] = 'There\'s a backpack in the hut that leads underwater. Once you have the backpack you can pick up the lightstone -- not to mention other stuff you might need.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I can\'t pick up the lightstone.',arrAnswers)
arrQuestions[4] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Gears are much shinier than ocean-dwelling plants and animals.'
arrAnswers[1] = 'Try dragging the lightstone along the ocean floor.'
arrAnswers[2] = 'The gear has fallen into a clump of sea plants and it\'s hard to tell which one is the gear! Shine the lightstone on the clumps of sea plants that look like they have spokes -- eventually you\'ll find the gear.'
arrAnswers[3] = 'The gear could be in any of the four underwater scenes. Try turning around, moving towards the sunken hut, or moving back towards the hole that leads to the surface.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I know what I\'m supposed to do underwater, but how do I find it?',arrAnswers)
arrQuestions[5] = myQuestion
Sections[2] = new hintSections()
Sections[2].setSection('Ga-Koro',arrQuestions)

arrQuestions = new Array()
arrAnswers = new Array()
arrAnswers[0] = 'Those statues look kind of familiar, don\'t they?'
arrAnswers[1] = 'Have you tried clicking on them?'
arrAnswers[2] = 'That slot looks like something might fit into it.'
arrAnswers[3] = 'You need a key, better look elsewhere.'
arrAnswers[4] = 'The statues are of the six Toa, each of which is associated with a particular element.'
arrAnswers[5] = 'This place is called the Quarry.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('What do I do in the dead-end valley with all the huge statues?',arrAnswers)
arrQuestions[0] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'From the shores, turn left at the first intersection, and turn right at the second intersection.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('How do I get to Po-Koro?',arrAnswers)
arrQuestions[1] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Try talking to everyone, someone might know more about what\'s going on.'
arrAnswers[1] = 'There\'s a Koli player in the stadium that you might want to talk to.'
arrAnswers[2] = 'Try leaving the stadium and coming back.'
arrAnswers[3] = 'Oops, he left his Koli ball behind...'
arrAnswers[4] = 'Something\'s very strange about that ball. You might want to show it to Onewa.'
arrAnswers[5] = 'For that matter, you might want to find out where that ball came from.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('What\'s wrong with the villagers in Po-Koro?',arrAnswers)
arrQuestions[2] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Well, there\'s a big marketplace in the middle of Po-Koro.'
arrAnswers[1] = 'Maybe someone\'s selling them.'
arrAnswers[2] = 'Talk to the merchant just to the right of the gate when you come into Po-Koro.'
arrAnswers[3] = 'Hmm, he won\'t tell you where he got them from. Maybe there\'s another clue around?'
arrAnswers[4] = 'Look near his stand for clues.'
arrAnswers[5] = 'There\'s an object just to the right of his stand, on the ground. It\'s not a Koli ball.'
arrAnswers[6] = 'Have you seen anywhere that this might fit into?'
arrAnswers[7] = 'It\'s a key for one of the statues in the quarry.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('Where do Comet Koli balls come from?',arrAnswers)
arrQuestions[3] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'From Po-Koro, turn left at the first intersection, and turn left again at the second intersection.'
arrAnswers[1] = 'From the shores, turn right at the first intersection.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('How do I get to the Quarry?',arrAnswers)
arrQuestions[4] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'If you have the key, there is a symbol on it.'
arrAnswers[1] = 'This symbol corresponds to one of the six elements: earth, stone, water, air, fire, or ice.'
arrAnswers[2] = 'The six elements correspond to the six Toa.'
arrAnswers[3] = 'The statues are of the Great Masks of Power that belong to each of the six Toa.'
arrAnswers[4] = 'If you\'re not sure which Mask goes with which Toa or which Toa goes with which element, look  at www.lego.com/bionicle/toa.asp.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('How do I know which statue in the Quarry is the right one?',arrAnswers)
arrQuestions[5] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Did you see Pohatu? What did he say?'
arrAnswers[1] = 'Try to knock down the Rahi\'s nest with stones.'
arrAnswers[2] = 'Click on a stone, drag it until you get to supporting trunk and fire!'
arrAnswers[3] = 'Knock down all of the Rahi\'s support and escape with Pohatu.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve entered the secret chamber and there\'s an angry Nui Jaga in there! What do I do?',arrAnswers)
arrQuestions[6] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Have you talked to Onewa?'
arrAnswers[1] = 'He should give you a gift.'
arrAnswers[2] = 'Take the chisel back to Ga-Koro.'
arrAnswers[3] = 'Give the chisel to one of Ga-Koro\'s residents.'
arrAnswers[4] = 'You should receive another gift in exchange for the chisel from Nokama.'
arrAnswers[5] = 'The new gift is an episode book with movies from all seven stories.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve returned to Po-Koro and everyone seems better. Now what?',arrAnswers)
arrQuestions[7] = myQuestion
Sections[3] = new hintSections()
Sections[3].setSection('Po-Wahi and Po-Koro',arrQuestions)

arrQuestions = new Array()
arrAnswers = new Array()
arrAnswers[0] = 'Have you talked to the crab driver?'
arrAnswers[1] = 'Take his suggestion and ride the crab.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'m at the entrance to the cave and there are some strange creatures there. What do I do?',arrAnswers)
arrQuestions[0] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Try talking to some of the locals.'
arrAnswers[1] = 'Try the hut on the left.'
arrAnswers[2] = 'Talk to Onepu. What does he tell you?'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I just got off the crab ride into the underground tunnels. Where do I go?',arrAnswers)
arrQuestions[1] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Talk to more villagers.'
arrAnswers[1] = 'Try crossing the bridge.'
arrAnswers[2] = 'Find Whenua\'s hut and talk to him.'
arrAnswers[3] = 'What seems to be the problem?'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve talked to Onepu. Where do I go now?',arrAnswers)
arrQuestions[2] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Try crossing the bridge and venturing into the tunnels.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve talked to Onepu and Whenua, where do I go now?',arrAnswers)
arrQuestions[3] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'To the right is Le-Koro, to the left is Ta-Koro. You should brush up on your Bionicle language!'
arrAnswers[1] = 'Take the right fork towards Le-Koro.'
arrAnswers[2] = 'Did you run into anyone?'
arrAnswers[3] = 'Taipu is working, but its not easy without some lightstones.'
arrAnswers[4] = 'Try going back towards Ta-Koro.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve come to a fork in the road. Which way should I go?',arrAnswers)
arrQuestions[4] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'This would be a lot easier if you could translate Bionicle language!'
arrAnswers[1] = 'Go the right towards Ta-Koro.'
arrAnswers[2] = 'Notice any extra doorways along the way?'
arrAnswers[3] = 'Look for a doorway lit by two lanterns.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve come back to the fork in the road, which way do I go?',arrAnswers)
arrQuestions[5] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'You\'ll need something to ride across those waves of lava.'
arrAnswers[1] = 'Try continuing on Ta-Koro and look around the village.'
arrAnswers[2] = 'Be sure to talk to anyone who\'s passing by.'
arrAnswers[3] = 'Grab the lava surfboard from the lava surfer.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('How can I get across the lava overflow?',arrAnswers)
arrQuestions[6] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Lava surfboards are good for surfing on lava.'
arrAnswers[1] = 'Go back to the lava overflow and glide across!'
myQuestion = new hintQuestion()
myQuestion.setQuestion('What do I do with the lava surfboard?',arrAnswers)
arrQuestions[7] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'You need to activate the pump.'
arrAnswers[1] = 'It needs to be turned on. It only runs when all of the lights are on.'
arrAnswers[2] = 'If you get the pump going, the lightstone mines should be open again.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('How do I drain the lava?',arrAnswers)
arrQuestions[8] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Take the elevator down and talk to the Matoran there.'
arrAnswers[1] = 'What does he ask you?'
arrAnswers[2] = 'Do you know an astrologer?'
arrAnswers[3] = 'There is an astrologer in Ga-Koro.'
arrAnswers[4] = 'Take the Matoran\'s message to Ga-Koro.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve wandered back into the mines and I see an elevator. What does it do?',arrAnswers)
arrQuestions[9] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Just follow the signs out of the tunnel!'
arrAnswers[1] = 'Pass back through Onu-Koro until you get to the crabs.'
arrAnswers[2] = 'Ride the crab back up out of the mine.'
arrAnswers[3] = 'Pass back through the deserts of Onu-Wahi and Po-Wahi until you get to the ship.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve got the Matoran\'s message. How do I get back to Ga-Koro?',arrAnswers)
arrQuestions[10] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Try a few huts.'
arrAnswers[1] = 'The astrologer is right next to the weaving Matoran.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'m back in Ga-Koro. Where is the astrologer?',arrAnswers)
arrQuestions[11] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Go down into the chamber and use the Gnomen and one of your other tools to make it 4:00 on the sundial.'
arrAnswers[1] = 'Your lightstone can be used as an artificial sunlight.'
arrAnswers[2] = 'If it you leave the sundial at 4:00 for a few seconds, a secret should be revealed!'
arrAnswers[3] = 'A Golden Tanohi mask!'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'m back in Onu-Koro in the mine with the sundial. What do I do?',arrAnswers)
arrQuestions[12] = myQuestion
Sections[4] = new hintSections()
Sections[4].setSection('Onu-Koro',arrQuestions)

arrQuestions = new Array()
arrAnswers = new Array()
arrAnswers[0] = 'Don\'t worry. Taipu is ok.'
arrAnswers[1] = 'He was captured by one of Makuta\'s minions - the Nui-Rama.'
arrAnswers[2] = 'He\'s not hurt, but you will have to rescue him.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I took Taipu with me, but some creature grabbed him and now he\'s gone - what happened?',arrAnswers)
arrQuestions[0] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Notice the trees high above the pods? You need to get up there.'
arrAnswers[1] = 'Try entering one of the pods.'
arrAnswers[2] = 'The pod is actually an elevator. Turn the three levers to "up" to go to the top.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve reached a place where there are two big pods - what do I do?',arrAnswers)
arrQuestions[1] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Look around the village. What do you see?'
arrAnswers[1] = 'Pick up the flute lying on the ground.'
arrAnswers[2] = 'Try and play a tune on the flute.'
arrAnswers[3] = 'Not sure what to play? Try hitting the blue tab for a hint.'
arrAnswers[4] = 'If you follow the pattern of the blue tab, you should meet the people of Le-Koro!'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve made it up to the treetops. Where should I go?',arrAnswers)
arrQuestions[2] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Have you tried venturing "uptree"?'
arrAnswers[1] = 'You should find Kongu asking for you to join him and battle the Nui-Rama.'
arrAnswers[2] = 'Don\'t be afraid! Join Kongu against the Nui-Rama.'
arrAnswers[3] = 'Once you\'re flying with Kongu, try to nail some of those Nui-Rama!'
arrAnswers[4] = 'Can\'t hit them? Click your mouse to hurl a disk.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve talked to a few Le-Koronans, where should I go?',arrAnswers)
arrQuestions[3] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'What did Kongu say? Maybe you should try flying with him again.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I was flying along battling the Nui-Rama when I suddenly fell back into the jungle. What happened?',arrAnswers)
arrQuestions[4] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Have you looked around the entire cave, both to the left and right of Matau?'
arrAnswers[1] = 'Try checking some of the holes in the hive.'
arrAnswers[2] = 'Click on one of the holes on the left side of the screen right above the blue bug.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve defeated the Nui-Rama and now I\'m in their hive, where do I go?',arrAnswers)
arrQuestions[5] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Did you talk to Matau? What did he say?'
arrAnswers[1] = 'Be sure to get your gift from Matau.'
arrAnswers[2] = 'The new flute song is used just like the other.'
arrAnswers[3] = 'You can use the new flute song to travel all over Mata Nui…except Ko-Koro - for now….'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'m back in Le-Koro and everyone is celebrating. What do I do now?',arrAnswers)
arrQuestions[6] = myQuestion
Sections[5] = new hintSections()
Sections[5].setSection('Le-Koro',arrQuestions)

arrQuestions = new Array()
arrAnswers = new Array()
arrAnswers[0] = 'Ko-koro is a snowy village high in the mountains.'
arrAnswers[1] = 'You need to take a cable car to get there.'
arrAnswers[2] = 'Follow the path to the right of the entrance to Ta-Koro.'
arrAnswers[3] = 'Try the cable car at the top of the path.'
arrAnswers[4] = 'You can\'t ride the cable car without a special ensign.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('How do I get to Ko-Koro?',arrAnswers)
arrQuestions[0] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'You must visit an old friend to get the Ta-Koronan ensign you need.'
arrAnswers[1] = 'Try one of the residents of Ta-Koro.'
arrAnswers[2] = 'Jala has the ensign you need.'
arrAnswers[3] = 'He is located just inside the gates to Ta-Koro on the right.'
arrAnswers[4] = 'After getting the ensign, return to the cable car.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve found the cable car, but they won\'t let me ride. What do I do?',arrAnswers)
arrQuestions[1] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Have you tried exploring a bit?'
arrAnswers[1] = 'Try the small hut on the left.'
arrAnswers[2] = 'Pick up the heatstone in the hut. You\'ll need it later.'
arrAnswers[3] = 'Look outside in the snow for some footprints.'
arrAnswers[4] = 'They will lead you to Kopeke, one of Ko-Koro\'s residents.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'m in Ko-Koro. I don\'t know what to do. Help me!',arrAnswers)
arrQuestions[2] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'He needs to be thawed out.'
arrAnswers[1] = 'Heat will melt the ice.'
arrAnswers[2] = 'Heat from a heatstone would help.'
arrAnswers[3] = 'You can get a heatstone in the cave back by the cable car.'
arrAnswers[4] = 'Use the heat stone to thaw Kopeke out.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve found a frozen Matoran! How can I help him?',arrAnswers)
arrQuestions[3] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Follow him!'
arrAnswers[1] = 'Once you catch up to him, talk to him.'
arrAnswers[2] = 'After talking to Kopeke, follow the corridor to the right towards the center of Ko-Koro.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I thawed out Kopeke and he ran away. What do I do?',arrAnswers)
arrQuestions[4] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Use your mouse to place the masks on the wall and crack the code.'
arrAnswers[1] = 'The masks of power must be matched with their respective noble masks.'
arrAnswers[2] = 'Take the set of noble and power masks and match them with the right symbol.'
arrAnswers[3] = 'Place the mask of power in the top spot and the noble mask underneath it.'
arrAnswers[4] = 'Once all the masks are in the right place, the door to Ko-Koro will open.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve come to a large wall with some Masks. How do I pass?',arrAnswers)
arrQuestions[5] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Enter Nuju\'s temple. It\'s straight ahead.'
arrAnswers[1] = 'Talk to the Matoran on the left.'
arrAnswers[2] = 'He will tell you that Matoro is out on the drifts hunting Rahi.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve passed the mask puzzle and I\'m in Ko-Koro. What do I do?',arrAnswers)
arrQuestions[6] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Follow the Matoran\'s advice.'
arrAnswers[1] = 'Look for Matoro\'s flags in the snow.'
arrAnswers[2] = 'Keep following them until you find the Matorann stone with a secret message.'
arrAnswers[3] = 'Use the Bionicle decoder to decipher the message if you dare!'
arrAnswers[4] = 'After finding the stone, continue looking for Matoro in the drifts. Follow the red flags.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve gone down the passage to find Matoro and I can\'t find him. Where do I go?',arrAnswers)
arrQuestions[7] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Did you try talking to some Matoran in the temple?'
arrAnswers[1] = 'Talk to Nuju.'
arrAnswers[2] = 'He will tell you what you need to do next in Mata Nui.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('Matoro saved me and defeated the Rahi! Now I\'m back in the temple. What do I do?',arrAnswers)
arrQuestions[8] = myQuestion
Sections[6] = new hintSections()
Sections[6].setSection('Ko-Koro',arrQuestions)

arrQuestions = new Array()
arrAnswers = new Array()
arrAnswers[0] = 'Have you come across anyone on Mata Nui yet?'
arrAnswers[1] = 'Look for Kapura outside of Ta-Koro.'
arrAnswers[2] = 'He will explain things to you and go with you to Vakama.'
arrAnswers[3] = 'Vakama will instruct you on how you must collect all the Matoran from the villages.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('Where do I go? What do I do? Help!',arrAnswers)
arrQuestions[0] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Have you tried talking to any of them?'
arrAnswers[1] = 'Try looking right outside of Ga-koro.'
arrAnswers[2] = 'Use Maku to sail into the waterfall.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('Now that I\'ve collected all my Matoran, what do I do?',arrAnswers)
arrQuestions[1] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Have you tried talking to your Matoran?'
arrAnswers[1] = 'Try using your Matoran when you come to challenges.'
arrAnswers[2] = 'Try using Tamaru to cross the gorge.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve come to a gorge. How do I get across?',arrAnswers)
arrQuestions[2] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Remember: Use your Matoran when you come to challenges.'
arrAnswers[1] = 'Try using Hafu and Taipu to clear the rock.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve come to a rockslide. How do I pass?',arrAnswers)
arrQuestions[3] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Remember: Use your Matoran when you come to challenges.'
arrAnswers[1] = 'At the gate use Kopeke to carve a key of ice to pass.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'ve come to a locked gate. How can I get through?',arrAnswers)
arrQuestions[4] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Have you tried clicking on a Matoran?'
arrAnswers[1] = 'Click on a Matoran to hurl a disk.'
arrAnswers[2] = 'Click on a Rahi to choose a target.'
arrAnswers[3] = 'Watch your health and the Rahi\'s health to see who will win.'
arrAnswers[4] = 'In between battles, get sneak peeks at the Toa battling the Manas.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'m at Kini-Nui and the Rahi are attacking. What do I do?',arrAnswers)
arrQuestions[5] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'You must keep fighting to protect the Toa.'
arrAnswers[1] = 'After three victories, you will see the Rahi closing in.'
arrAnswers[2] = 'Don\'t worry though, your fellow Matoran from all of the villages will come to your aid!'
myQuestion = new hintQuestion()
myQuestion.setQuestion('When does the battle with the Rahi end?',arrAnswers)
arrQuestions[6] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Remember Gali\'s message.'
arrAnswers[1] = 'Have you talked to any of the Matoran?'
arrAnswers[2] = 'Try talking to some of the Onu-Koronan.'
arrAnswers[3] = 'Ride the crab to Onu-Koro to investigate the strange goings on.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('The Matoran have helped me defeat the Rahi. What do I do now?',arrAnswers)
arrQuestions[7] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Try talking to the Turaga of the village.'
arrAnswers[1] = 'Go to Whenua\'s hut and talk to him.'
arrAnswers[2] = 'Whenua will tell you to go to the Great Mine.'
arrAnswers[3] = 'Take the elevator down and go to the Great Mine.'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'m in Onu-Koro and I don\'t know where to go.',arrAnswers)
arrQuestions[8] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Try looking around a bit.'
arrAnswers[1] = 'Try the chamber where the Golden Kanohi was.'
arrAnswers[2] = 'You will descend into Makuta\'s lair.'
arrAnswers[3] = 'Walk towards the red portal.'
arrAnswers[4] = 'You will get a secret view of the Toa\'s battle with Makuta!'
myQuestion = new hintQuestion()
myQuestion.setQuestion('What do I do once I\'m in the Great Mine?',arrAnswers)
arrQuestions[9] = myQuestion
arrAnswers = new Array()
arrAnswers[0] = 'Do you see anyone nearby?'
arrAnswers[1] = 'Try talking to Vakama.'
arrAnswers[2] = 'Vakama will explain what has happened.'
arrAnswers[3] = 'Congratulations! You\'ve saved the island and reached the end of the Mata Nui game. Thanks for playing!'
myQuestion = new hintQuestion()
myQuestion.setQuestion('I\'m standing on the beach where the game started. What do I do now?',arrAnswers)
arrQuestions[10] = myQuestion
Sections[7] = new hintSections()
Sections[7].setSection('Kini-Nui',arrQuestions)

// Revert Matoran to Tohunga and export the values.
// The updated JavaScript version replaced Tohunga with Matoran, nothing else.
const matoranToTohunga = s => s.replace(/Matoran/g, 'Tohunga');
for (const section of Sections) {
	section.text = matoranToTohunga(section.text);
	for (const question of section.questions) {
		question.text = matoranToTohunga(question.text);
		question.answers = question.answers.map(matoranToTohunga);
	}
}
exports.sections = Sections;
