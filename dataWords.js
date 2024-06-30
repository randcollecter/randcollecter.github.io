import key from "./getKey.js";
class newWord{
    constructor(word, level, img, isSecret){
        word = word.toLowerCase();
        const el = userDataObject[word]
        const elNotUndefined = !!el;
        this.word = word;
        this.complated = elNotUndefined && el.complated;
        this.level = level;
        this.isSecret =  elNotUndefined ? el.isSecret : isSecret;
        this.image = img ? `images/${word.toLowerCase()}.png` :"images/noImage.png"
    }
}
let origDataUser = localStorage.getItem('randCollecter') || '';
const userDataObject = {};
if(origDataUser){
    try{
        origDataUser = CryptoJS.AES.decrypt(origDataUser, key).toString(CryptoJS.enc.Utf8)
        JSON.parse(origDataUser).complatedElms.map((el) => {
            userDataObject[el.word] = el;
        })
    }
    catch(err){
        alert("Data is cleaned :(");
        localStorage.removeItem("randCollecter");
    }
}
const data = [];
//orig
const info = {
    "level1" : {
        words: ["Ab","Ad",'Ai','Am','An','As','At','Aw','Ax','Ay','Ba','Be','Bi','By','Da','Do','Ed','Ef','Eh','El','Em','En','Er','Es','Et', 'Ex','Fa','Go','Ha','He','Hi','Ho','Id','If','In','Is','It','Jo','Ka','La','Li','Lo','Ma','Me','Mi','Mu','My','No','Nu','Od','Of','Oh','On','Op','Or','Ow','Ox', "Ok",'Oi','Om','Pa','Pe','Pi','Re','Sh','Si','So','Ta','Ti','To','Uh','Um','Up','Us','We','Ye'],
        images: "ad ai am an at ax be by do en hi id if in is it my no or pi si so up us we",
        secret: "hi",
    },
    "level2" : {
        words: ["Act", "Add", "Age", "Aim", "Air", "Ale", "All", "Amp", "And", "Ant", "Any", "Apt", "Arc", "Are", "Arm", "Art", "Ash", "Ask", "Ate", "Awe", "Bad", "Bag", "Bar", "Bat", "Bay", "Bed", "Bee", "Beg", "Bet", "Bid", "Big", "Bin", "Bio", "Bit", "Bog", "Box", "Boy", "Bra", "Bud", "Bug", "Bun", "Bus", "But", "Buy", "Bye", "Cab", "Can", "Cap", "Car", "Cat", "Cow", "Cry", "Cub", "Cup", "Cut", "Dad", "Dam", "Day", "Den", "Dew", "Die", "Dig", "Dim", "Din", "Dip", "Dog", "Dot", "Dry", "Due", "Ear", "Eat", "Egg", "Ego", "End", "Era", "Eve", "Eye", "Fan", "Far", "Fat", "Few", "Fig", "Fin", "Fit", "Fix", "Fly", "Fog", "For", "Fox", "Fry", "Fun", "Fur", "Gas", "Get", "Gig", "Got", "Gun", "Guy", "Had", "Hat", "Hay", "Hen", "Her", "Hew", "Hey", "Hid", "Him", "Hip", "Hit", "Hog", "Hop", "Hot", "How", "Hub", "Hue", "Hut", "Ice", "Ill", "Ink", "Ion", "Jam", "Jaw", "Jet", "Job", "Jog", "Joy", "Jug", "Key", "Kit", "Lab", "Lad", "Lag", "Lap", "Law", "Lay", "Led", "Leg", "Let", "Lid", "Lie", "Lip", "Lit", "Log", "Lot", "Low", "Mad", "Man", "Mat", "May", "Men", "Met", "Mob", "Mom", "Mud", "Mug", "Nap", "Net", "New", "Nor", "Not", "Now", "Nut", "Oak", "Odd", "Oil", "Old", "One", "Orb", "Our", "Out", "Own", "Pad", "Pal", "Pan", "Par", "Pat", "Paw", "Pay", "Pen", "Pet", "Pie", "Pig", "Pin", "Pit", "Pod", "Pot", "Pro", "Put", "Rag", "Ran", "Rat", "Raw", "Red", "Rib", "Rid", "Rim", "Rip", "Rob", "Rod", "Rot"],
        images: "add age aim air all and ant arm bad bag bar bat bed bee big bin bio box boy bug bus cat buy bye cow cry cap day dog eat egg end eye fox oil",
        secret: "arm bye ",
    }
}
function findImg(level, el){
    let img = info["level" + level].images || '';
    img = img.toLowerCase();
    return img.indexOf(el.toLowerCase()) !== -1;
}
function isSecret(level, el){
    let secret = info["level" + level].secret || '';
    secret = secret.toLowerCase();
    return secret.indexOf(el.toLowerCase()) !== -1;
}

let i = 1;
for(let el in info){
    data.push(info[el].words.map((el) =>  new newWord(el, i, findImg(i, el), isSecret(i,el))));
    i++;
}


export default data