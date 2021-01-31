const HashMap = require('./HashMap')
const HashMap_SepChain = require('./HashMap_SepChain')


HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;


function removeDuplicates(string) {
    const map = new HashMap();
    const res = []
    string.split('').forEach(letter => {
            if (!map.get(letter)) {
                map.set(letter, true)
                res.push(letter)
            }
    })
    return res.join('')
}


function isPalindrome(s){
    string = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    const map = new HashMap();
    let singleInstanceCounter = 0;
    for (let i = 0; i < string.length; i++){
        let val = map.get(string[i])
        if (val !== undefined) {
            map.set(`${string[i]}`, val + 1)
        }
        else 
            map.set(string[i], 1)
    }
    //we are going to use memoization to keep track of what characters we've already checked
    const temp = new HashMap();
    for (let i = 0; i < string.length; i++) {
        //if the string is undefined (not in our temp )
        if (!temp.get(`${string[i]}`)) {
            temp.set(`${string[i]}`, true)
            let val = map.get(string[i])
            if (val === 1 || val % 2 !== 0)
                singleInstanceCounter++;
        }
        
    }   
    if (singleInstanceCounter > 1)
        return false;
    else
        return true
}



function main() {
    const lotr = new HashMap_SepChain();
    lotr.set('Peter', 3)
    const data = [
        { "Hobbit": "Bilbo" }, { "Hobbit": "Frodo" },
        { "Wizard": "Gandalf" }, { "Human": "Aragorn" }, 
        { "Elf": "Legolas" }, { "Maiar": "The Necromancer" },
        { "Maiar": "Sauron" }, { "RingBearer": "Gollum" }, 
        { "LadyOfLight": "Galadriel" }, { "HalfElven": "Arwen" },
        { "Ent": "Treebeard" }
    ]
    data.forEach(obj => {
        const key = Object.keys(obj)[0];
        lotr.set(key, obj[key])
    });
    console.log(lotr.get('Elf'))
    //console.log(removeDuplicates('google all that you think can think of'))

    console.log(isPalindrome('abccba'));
    console.log(isPalindrome('A Man, A Plan, A Canal – Panama!'))
    console.log(isPalindrome('A man, a plan, a caret, a ban, a myriad, a sum, a lac, a liar, a hoop, a pint, a catalpa, a gas, an oil, a bird, a yell, a vat, a caw, a pax, a wag, a tax, a nay, a ram, a cap, a yam, a gay, a tsar, a wall, a car, a luger, a ward, a bin, a woman, a vassal, a wolf, a tuna, a nit, a pall, a fret, a watt, a bay, a daub, a tan, a cab, a datum, a gall, a hat, a fag, a zap, a say, a jaw, a lay, a wet, a gallop, a tug, a trot, a trap, a tram, a torr, a caper, a top, a tonk, a toll, a ball, a fair, a sax, a minim, a tenor, a bass, a passer, a capital, a rut, an amen, a ted, a cabal, a tang, a sun, an ass, a maw, a sag, a jam, a dam, a sub, a salt, an axon, a sail, an ad, a wadi, a radian, a room, a rood, a rip, a tad, a pariah, a revel, a reel, a reed, a pool, a plug, a pin, a peek, a parabola, a dog, a pat, a cud, a nu, a fan, a pal, a rum, a nod, an eta, a lag, an eel, a batik, a mug, a mot, a nap, a maxim, a mood, a leek, a grub, a gob, a gel, a drab, a citadel, a total, a cedar, a tap, a gag, a rat, a manor, a bar, a gal, a cola, a pap, a yaw, a tab, a raj, a gab, a nag, a pagan, a bag, a jar, a bat, a way, a papa, a local, a gar, a baron, a mat, a rag, a gap, a tar, a decal, a tot, a led, a tic, a bard, a leg, a bog, a burg, a keel, a doom, a mix, a map, an atom, a gum, a kit, a baleen, a gala, a ten, a don, a mural, a pan, a faun, a ducat, a pagoda, a lob, a rap, a keep, a nip, a gulp, a loop, a deer, a leer, a lever, a hair, a pad, a tapir, a door, a moor, an aid, a raid, a wad, an alias, an ox, an atlas, a bus, a madam, a jag, a saw, a mass, an anus, a gnat, a lab, a cadet, an em, a natural, a tip, a caress, a pass, a baronet, a minimax, a sari, a fall, a ballot, a knot, a pot, a rep, a carrot, a mart, a part, a tort, a gut, a poll, a gateway, a law, a jay, a sap, a zag, a fat, a hall, a gamut, a dab, a can, a tabu, a day, a batt, a waterfall, a patina, a nut, a flow, a lass, a van, a mow, a nib, a draw, a regular, a call, a war, a stay, a gam, a yap, a cam, a ray, an ax, a tag, a wax, a paw, a cat, a valley, a drib, a lion, a saga, a plat, a catnip, a pooh, a rail, a calamus, a dairyman, a bater, a canal – Panama!'))
    console.log(isPalindrome('abcbcayyttpr'))
}

const WhatDoesThisDo = function () {
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1, 10);
    map1.set(str2, 20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3, 20);
    map2.set(str4, 10);

    //console.log('str1', map1.get(str1)); //20  we are overwriting the value of str1 because the key is the same
    //console.log('str3', map2.get(str3)); //10 

    
}


WhatDoesThisDo();
main()