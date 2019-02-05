const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const db = require('./models/');
const session = require('express-session');
// const fileUpload = require('express-fileupload');

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static('public'));

app.use(require('./routes/signup'));
app.use(require('./routes/login'));
app.use(require('./routes/logout'));
app.use(require('./routes/index'));
app.use(require('./routes/register'));
app.use(require('./routes/profile'));
app.use(require('./routes/dashboard'));
app.use(require('./routes/chat'));
app.use(require('./routes/search'));
app.use(require('./routes/cards'));
const fileUpload = require('express-fileupload');


app.get('/chat', (req, res)=>{
    // res.sendFile(__dirname + '/views/index.ejs')
    res.render('chat')
});
app.use(require('./routes/friends'))
app.use(require('./routes/api'));



io.on('connection', (socket)=> {
    console.log('someone connected')
    socket.on('chat message', (msg)=> {
        io.sockets.emit('chat message', msg);
        
        socket.on('typing', data => {
            socket.broadcast.emit('typing', data)
        })
    });
});


// need this only when creating database.
// db.users.sequelize.sync({force:true}).then(()=>{
//     app.listen(3500)
// })



// http.listen(3000, ()=>{
//     console.log('listening on port 3000')
// })


// add this in app file or router file and run 1 time
db.states.bulkCreate([
    {state:'AL', name:'Alabama, US'}
    ,{state:'AK', name:'Alaska, US'}
    ,{state:'AZ', name:'Arizona, US'}
    ,{state:'AR', name:'Arkansas, US'}
    ,{state:'AA', name:'Armed Forces America'}
    ,{state:'AE', name:'Armed Forces Europe'}
    ,{state:'AP', name:'Armed Forces Pacific'}
    ,{state:'CA', name:'California, US'}
    ,{state:'CO', name:'Colorado, US'}
    ,{state:'CT', name:'Connecticut, US'}
    ,{state:'DE', name:'Delaware, US'}
    ,{state:'DC', name:'District of Columbia, US'}
    ,{state:'FL', name:'Florida, US'}
    ,{state:'GA', name:'Georgia, US'}
    ,{state:'HI', name:'Hawaii, US'}
    ,{state:'ID', name:'Idaho, US'}
    ,{state:'IL', name:'Illinois, US'}
    ,{state:'IN', name:'Indiana, US'}
    ,{state:'IA', name:'Iowa, US'}
    ,{state:'KS', name:'Kansas, US'}
    ,{state:'KY', name:'Kentucky, US'}
    ,{state:'LA', name:'Louisiana, US'}
    ,{state:'ME', name:'Maine, US'}
    ,{state:'MD', name:'Maryland, US'}
    ,{state:'MA', name:'Massachusetts, US'}
    ,{state:'MI', name:'Michigan, US'}
    ,{state:'MN', name:'Minnesota, US'}
    ,{state:'MS', name:'Mississippi, US'}
    ,{state:'MO', name:'Missouri, US'}
    ,{state:'MT', name:'Montana, US'}
    ,{state:'NE', name:'Nebraska, US'}
    ,{state:'NV', name:'Nevada, US'}
    ,{state:'NH', name:'New Hampshire, US'}
    ,{state:'NJ', name:'New Jersey, US'}
    ,{state:'NM', name:'New Mexico, US'}
    ,{state:'NY', name:'New York, US'}
    ,{state:'NC', name:'North Carolina, US'}
    ,{state:'ND', name:'North Dakota, US'}
    ,{state:'OH', name:'Ohio, US'}
    ,{state:'OK', name:'Oklahoma, US'}
    ,{state:'OR', name:'Oregon, US'}
    ,{state:'PA', name:'Pennsylvania, US'}
    ,{state:'RI', name:'Rhode Island, US'}
    ,{state:'SC', name:'South Carolina, US'}
    ,{state:'SD', name:'South Dakota, US'}
    ,{state:'TN', name:'Tennessee, US'}
    ,{state:'TX', name:'Texas, US'}
    ,{state:'UT', name:'Utah, US'}
    ,{state:'VT', name:'Vermont, US'}
    ,{state:'VA', name:'Virginia, US'}
    ,{state:'WA', name:'Washington, US'}
    ,{state:'WV', name:'West Virginia, US'}
    ,{state:'WI', name:'Wisconsin, US'}
    ,{state:'WY', name:'Wyoming, US'}
     ])
    
    db.industries.bulkCreate([
    {industries:'Accounting'}
    ,{industries:'Admin & Clerical'}
    ,{industries:'Automotive'}
    ,{industries:'Banking'}
    ,{industries:'Biotech'}
    ,{industries:'Broadcast - Journalism'}
    ,{industries:'Business Development'}
    ,{industries:'Construction'}
    ,{industries:'Consultant'}
    ,{industries:'Customer Service'}
    ,{industries:'Design'}
    ,{industries:'Distribution - Shipping'}
    ,{industries:'Education - Teaching'}
    ,{industries:'Engineering'}
    ,{industries:'Finance'}
    ,{industries:'Government'}
    ,{industries:'Grocery'}
    ,{industries:'Health Care'}
    ,{industries:'Hotel - Hospitality'}
    ,{industries:'Human Resources'}
    ,{industries:'Information Technology'}
    ,{industries:'Insurance'}
    ,{industries:'Legal'}
    ,{industries:'Manufacturing'}
    ,{industries:'Marketing'}
    ,{industries:'Media - Journalism - Newspaper'}
    ,{industries:'Nonprofit - Social Services'}
    ,{industries:'Nurse'}
    ,{industries:'Other'}
    ,{industries:'Pharmaceutical'}
    ,{industries:'Professional Services'}
    ,{industries:'Purchasing - Procurement'}
    ,{industries:'QA - Quality Control'}
    ,{industries:'Real Estate'}
    ,{industries:'Research'}
    ,{industries:'Restaurant - Food Service'}
    ,{industries:'Retail'}
    ,{industries:'Sales'}
    ,{industries:'Science'}
    ,{industries:'Strategy - Planning'}
    ,{industries:'Supply Chain'}
    ,{industries:'Telecommunications'}
    ,{industries:'Training'}
    ,{industries:'Transportation'}
    ,{industries:'Warehouse'}
     ])
    
    db.roles.bulkCreate([
    {role:'teacher'}
    ,{role:'student'}
    ,{role:'mentor'}
     ])
    
    db.schools.bulkCreate([
        {name:'ALDINE H S', street:'11101 AIRLINE DR', city:'HOUSTON', state_code:47, zipcode:'77037', telephone:'(281)448-5231',type:'High School'}
        ,{name:'ALIEF EARLY COLLEGE H S', street:'2811 A HAYES RD', city:'HOUSTON', state_code:47, zipcode:'77082', telephone:'(281)988-3010',type:'High School'}
        ,{name:'ANDY DEKANEY H S', street:'22352 IMPERIAL VLY DR', city:'HOUSTON', state_code:47, zipcode:'77073', telephone:'(281)891-7260',type:'High School'}
        ,{name:'ARTHUR MILLER CAREER CENTER', street:'1734 KATYLAND DR', city:'KATY', state_code:47, zipcode:'77493', telephone:'(281)237-6322',type:'High School'}
        ,{name:'ATASCOCITA H S', street:'13300 WILL CLAYTON PKWY', city:'HUMBLE', state_code:47, zipcode:'77346', telephone:'(281)641-7500',type:'High School'}
        ,{name:'AUSTIN H S', street:'1700 DUMBLE', city:'HOUSTON', state_code:47, zipcode:'77023', telephone:'(713)924-1600',type:'High School'}
        ,{name:'BELLAIRE H S', street:'5100 MAPLE', city:'BELLAIRE', state_code:47, zipcode:'77401', telephone:'(713)295-3704',type:'High School'}
        ,{name:'C E KING H S', street:'8540 C E KING PKWY', city:'HOUSTON', state_code:47, zipcode:'77044', telephone:'(281)727-3500',type:'High School'}
        ,{name:'CALVIN NELMS H S', street:'20625 CLAY RD', city:'KATY', state_code:47, zipcode:'77449', telephone:'(281)398-8031',type:'High School'}
        ,{name:'CARL WUNSCHE SR H S', street:'900 WUNSCHE LOOP', city:'SPRING', state_code:47, zipcode:'77373', telephone:'(281)891-7660',type:'High School'}
        ,{name:'CARNEGIE VANGUARD H S', street:'1501 TAFT', city:'HOUSTON', state_code:47, zipcode:'77019', telephone:'(713)732-3690',type:'High School'}
        ,{name:'CARVER H S FOR APPLIED TECH/ENGINEERING/ARTS', street:'2100 S VICTORY DR', city:'HOUSTON', state_code:47, zipcode:'77088', telephone:'(281)878-0310',type:'High School'}
        ,{name:'CHALLENGE EARLY COLLEGE H S', street:'5601 W LOOP S', city:'HOUSTON', state_code:47, zipcode:'77081', telephone:'(713)664-9712',type:'High School'}
        ,{name:'CHANNELVIEW H S', street:'1100 SHELDON RD', city:'CHANNELVIEW', state_code:47, zipcode:'77530', telephone:'(281)457-7300',type:'High School'}
        ,{name:'CHAVEZ H S', street:'8501 HOWARD', city:'HOUSTON', state_code:47, zipcode:'77017', telephone:'(713)495-6950',type:'High School'}
        ,{name:'CLEAR BROOK H S', street:'4607 FM 2351', city:'FRIENDSWOOD', state_code:47, zipcode:'77546', telephone:'(281)284-2100',type:'High School'}
        ,{name:'CLEAR HORIZONS EARLY COLLEGE H S', street:'13735 BEAMER RD BOX 613', city:'HOUSTON', state_code:47, zipcode:'77089', telephone:'(281)929-4657',type:'High School'}
        ,{name:'CLEAR LAKE H S', street:'2929 BAY AREA BLVD', city:'HOUSTON', state_code:47, zipcode:'77058', telephone:'(281)284-1900',type:'High School'}
        ,{name:'CLEAR VIEW H S', street:'400 S WALNUT', city:'WEBSTER', state_code:47, zipcode:'77598', telephone:'(281)284-1500',type:'High School'}
        ,{name:'COMMUNITY SCHOOL', street:'1838 A E SAM HOUSTON PKWY S', city:'PASADENA', state_code:47, zipcode:'77503', telephone:'(713)740-0298',type:'High School'}
        ,{name:'CROSBY CROSSROADS ACADEMY', street:'14515 FM 2100', city:'CROSBY', state_code:47, zipcode:'77532', telephone:'(281)328-9237',type:'High School'}
        ,{name:'CROSBY H S', street:'333 RED SUMMIT DR', city:'CROSBY', state_code:47, zipcode:'77532', telephone:'(281)328-9237',type:'High School'}
        ,{name:'CROSSROADS', street:'P O BOX 68', city:'ALIEF', state_code:47, zipcode:'77411', telephone:'(281)988-3266',type:'High School'}
        ,{name:'CY-FAIR H S', street:'22602 HEMPSTEAD HWY', city:'CYPRESS', state_code:47, zipcode:'77429', telephone:'(281)897-4600',type:'High School'}
        ,{name:'CYPRESS CREEK H S', street:'9815 GRANT RD', city:'HOUSTON', state_code:47, zipcode:'77070', telephone:'(281)897-4200',type:'High School'}
        ,{name:'CYPRESS FALLS H S', street:'9811 HUFFMEISTER RD', city:'HOUSTON', state_code:47, zipcode:'77095', telephone:'(281)856-1000',type:'High School'}
        ,{name:'CYPRESS LAKES H S', street:'5750 GREENHOUSE RD', city:'KATY', state_code:47, zipcode:'77449', telephone:'(281)856-3800',type:'High School'}
        ,{name:'CYPRESS RANCH H S', street:'10700 FRY RD', city:'CYPRESS', state_code:47, zipcode:'77433', telephone:'(281)373-2300',type:'High School'}
        ,{name:'CYPRESS RIDGE H S', street:'7900 N ELDRIDGE PKWY', city:'HOUSTON', state_code:47, zipcode:'77041', telephone:'(281)807-8000',type:'High School'}
        ,{name:'CYPRESS SPRINGS H S', street:'7909 FRY RD', city:'CYPRESS', state_code:47, zipcode:'77433', telephone:'(281)345-3000',type:'High School'}
        ,{name:'CYPRESS WOODS H S', street:'16825 SPRING CYPRESS RD', city:'CYPRESS', state_code:47, zipcode:'77429', telephone:'(281)213-1800',type:'High School'}
        ,{name:'DAVIS H S ALDINE', street:'12525 ELLA BLVD', city:'HOUSTON', state_code:47, zipcode:'77067', telephone:'(281)539-4070',type:'High School'}
        ,{name:'DEBAKEY H S FOR HEALTH PROF', street:'3100 SHENANDOAH ST', city:'HOUSTON', state_code:47, zipcode:'77021', telephone:'(713)741-2410',type:'High School'}
        ,{name:'DEER PARK HS', street:'710 W SAN AUGUSTINE', city:'DEER PARK', state_code:47, zipcode:'77536', telephone:'(832)668-7200',type:'High School'}
        ,{name:'DOBIE H S', street:'10220 BLACKHAWK', city:'HOUSTON', state_code:47, zipcode:'77089', telephone:'(281)481-3000',type:'High School'}
        ,{name:'EAST EARLY COLLEGE H S', street:'220 N MILBY ST', city:'HOUSTON', state_code:47, zipcode:'77003', telephone:'(713)847-4809',type:'High School'}
        ,{name:'EASTWOOD ACADEMY', street:'1315 DUMBLE', city:'HOUSTON', state_code:47, zipcode:'77023', telephone:'(713)924-1697',type:'High School'}
        ,{name:'EISENHOWER H S', street:'7922 ANTOINE DR', city:'HOUSTON', state_code:47, zipcode:'77088', telephone:'(281)878-0900',type:'High School'}
        ,{name:'ELSIK H S', street:'12601 HIGH STAR', city:'HOUSTON', state_code:47, zipcode:'77072', telephone:'(281)498-8110',type:'High School'}
        ,{name:'ELYSIAN FIELDS H S', street:'P O BOX 120', city:'ELYSIAN FIELDS', state_code:47, zipcode:'75642', telephone:'(903)633-2420',type:'High School'}
        ,{name:'EMPOWERMENT H S', street:'6400 WESTPARK DR STE 200', city:'HOUSTON', state_code:47, zipcode:'77057', telephone:'(713)954-9528',type:'High School'}
        ,{name:'ENDEAVOR HS-JOE FRANK CAMPBELL LEARNING CENTER', street:'915 SHELDON RD', city:'CHANNELVIEW', state_code:47, zipcode:'77530', telephone:'(281)457-0086',type:'High School'}
        ,{name:'ENERGIZED FOR STEM ACADEMY SOUTHEAST H S', street:'9220 JUTLAND RD', city:'HOUSTON', state_code:47, zipcode:'77033', telephone:'(713)641-1630',type:'High School'}
        ,{name:'ENERGIZED FOR STEM ACADEMY SOUTHWEST H S', street:'9220 JUTLAND', city:'HOUSTON', state_code:47, zipcode:'77033', telephone:'(713)641-1630',type:'High School'}
        ,{name:'ENERGY INSTITUTE H S', street:'1808 SAMPSON ST', city:'HOUSTON', state_code:47, zipcode:'77003', telephone:'(713)802-4620',type:'High School'}
        ,{name:'FURR H S', street:'520 MERCURY', city:'HOUSTON', state_code:47, zipcode:'77013', telephone:'(713)675-1118',type:'High School'}
        ,{name:'GALENA PARK H S', street:'1000 KEENE', city:'GALENA PARK', state_code:47, zipcode:'77547', telephone:'(832)386-2800',type:'High School'}
        ,{name:'GOOSE CREEK MEMORIAL', street:'P O BOX 30', city:'BAYTOWN', state_code:47, zipcode:'77522', telephone:'(281)421-4400',type:'High School'}
        ,{name:'H S #7', street:'20200 EASTWAY VILLAGE DR', city:'HUMBLE', state_code:47, zipcode:'77338', telephone:'(281)641-8058',type:'High School'}
        ,{name:'H S FOR LAW AND JUSTICE', street:'4701 DICKSON ST', city:'HOUSTON', state_code:47, zipcode:'77007', telephone:'(713)867-5100',type:'High School'}
        ,{name:'HALL CENTER FOR EDUCATION', street:'15014 ALDINE WESTFIELD', city:'HOUSTON', state_code:47, zipcode:'77032', telephone:'(281)985-7446',type:'High School'}
        ,{name:'HALLSVILLE H S', street:'P O BOX 810', city:'HALLSVILLE', state_code:47, zipcode:'75650', telephone:'(903)668-5990',type:'High School'}
        ,{name:'HARGRAVE H S', street:'P O BOX 2390', city:'HUFFMAN', state_code:47, zipcode:'77336', telephone:'(281)324-1845',type:'High School'}
        ,{name:'HARLETON H S', street:'P O BOX 710', city:'HARLETON', state_code:47, zipcode:'75651', telephone:'(903)777-2711',type:'High School'}
        ,{name:'HARMONY SCHOOL OF ADVANCEMENT-HOUSTON', street:'3171 N SAM HOUSTON PKWY W', city:'HOUSTON', state_code:47, zipcode:'77038', telephone:'(281)741-8899',type:'High School'}
        ,{name:'HARMONY SCIENCE ACADEMY-HOUSTON', street:'9431 W SAM HOUSTON PKWY S', city:'HOUSTON', state_code:47, zipcode:'77099', telephone:'(713)492-0214',type:'High School'}
        ,{name:'HAROLD D GUTHRIE CENTER FOR EXCELLENCE', street:'10660 HAMMERLY', city:'HOUSTON', state_code:47, zipcode:'77043', telephone:'(713)251-1300',type:'High School'}
        ,{name:'HASTINGS H S', street:'4410 COOK RD', city:'HOUSTON', state_code:47, zipcode:'77072', telephone:'(281)498-8110',type:'High School'}
        ,{name:'HEIGHTS H S', street:'413 E 13TH ST', city:'HOUSTON', state_code:47, zipcode:'77008', telephone:'(713)865-4400',type:'High School'}
        ,{name:'HIGHPOINT SCHOOL EAST (DAEP)', street:'8003 E SAM HOUSTON PKWY N HY 90', city:'HOUSTON', state_code:47, zipcode:'77049', telephone:'(281)459-1190',type:'High School'}
        ,{name:'HOUSTON ACADEMY FOR INTERNATIONAL STUDIES', street:'1810 STUART', city:'HOUSTON', state_code:47, zipcode:'77004', telephone:'(713)942-1430',type:'High School'}
        ,{name:'HOUSTON CAN ACADEMY - HOBBY', street:'325 W 12TH STE 200', city:'DALLAS', state_code:47, zipcode:'75208', telephone:'(832)379-4226',type:'High School'}
        ,{name:'HOUSTON CAN ACADEMY - NORTH', street:'325 W 12TH STE 200', city:'DALLAS', state_code:47, zipcode:'75208', telephone:'(214)946-2244',type:'High School'}
        ,{name:'HOUSTON CAN ACADEMY - SOUTHWEST', street:'325 W 12TH ST', city:'DALLAS', state_code:47, zipcode:'75208', telephone:'(214)943-2244',type:'High School'}
        ,{name:'HOUSTON HEIGHTS CHARTER SCHOOL', street:'1125 LAWRENCE ST', city:'HOUSTON', state_code:47, zipcode:'77008', telephone:'(713)868-9797',type:'High School'}
        ,{name:'HOUSTON MATH SCIENCE AND TECHNOLOGY CENTER', street:'9400 IRVINGTON', city:'HOUSTON', state_code:47, zipcode:'77076', telephone:'(713)696-0200',type:'High School'}
        ,{name:'HUMBLE H S', street:'1700 WILSON RD', city:'HUMBLE', state_code:47, zipcode:'77338', telephone:'(281)641-6300',type:'High School'}
        ,{name:'IMPACT EARLY COLLEGE H S', street:'P O BOX 30', city:'BAYTOWN', state_code:47, zipcode:'77522', telephone:'(281)420-4802',type:'High School'}
        ,{name:'ISCHOOL HIGH AT UNIVERSITY PARK', street:'P O BOX 292730', city:'LEWISVILLE', state_code:47, zipcode:'75029', telephone:'(972)316-3663',type:'High School'}
        ,{name:'JERSEY VILLAGE H S', street:'7600 SOLOMON ST', city:'HOUSTON', state_code:47, zipcode:'77040', telephone:'(713)896-3400',type:'High School'}
        ,{name:'JONES FUTURES ACADEMY', street:'7414 ST LO RD', city:'HOUSTON', state_code:47, zipcode:'77033', telephone:'(713)733-1111',type:'High School'}
        ,{name:'KASHMERE H S', street:'6900 WILEYVALE ST', city:'HOUSTON', state_code:47, zipcode:'77028', telephone:'(713)636-6400',type:'High School'}
        ,{name:'KERR H S', street:'8150 SUGARLAND HOWELL', city:'HOUSTON', state_code:47, zipcode:'77083', telephone:'(281)983-8484',type:'High School'}
        ,{name:'KINGWOOD PARK H S', street:'4015 WOODLAND HILLS DR', city:'KINGWOOD', state_code:47, zipcode:'77339', telephone:'(281)641-6600',type:'High School'}
        ,{name:'KIPP GENERATIONS COLLEGIATE', street:'6700 BELLAIRE BLVD', city:'HOUSTON', state_code:47, zipcode:'77074', telephone:'(832)230-0566',type:'High School'}
        ,{name:'KIPP HOUSTON H S', street:'6700 BELLAIRE BLVD', city:'HOUSTON', state_code:47, zipcode:'77074', telephone:'(832)328-1051',type:'High School'}
        ,{name:'KIPP NORTHEAST COLLEGE PREPARATORY', street:'6700 BELLAIRE BLVD', city:'HOUSTON', state_code:47, zipcode:'77074', telephone:'(832)230-0567',type:'High School'}
        ,{name:'KIPP SUNNYSIDE H S', street:'6700 BELLAIRE BLVD', city:'HOUSTON', state_code:47, zipcode:'77074', telephone:'(832)230-0562',type:'High School'}
        ,{name:'KLEIN COLLINS H S', street:'20811 ELLA BLVD', city:'SPRING', state_code:47, zipcode:'77388', telephone:'(832)484-5500',type:'High School'}
        ,{name:'KLEIN FOREST H S', street:'11400 MISTY VLY', city:'HOUSTON', state_code:47, zipcode:'77066', telephone:'(832)484-4500',type:'High School'}
        ,{name:'KLEIN H S', street:'16715 STUEBNER AIRLINE RD', city:'KLEIN', state_code:47, zipcode:'77379', telephone:'(832)484-4000',type:'High School'}
        ,{name:'KLEIN OAK H S', street:'22603 NORTHCREST DR', city:'SPRING', state_code:47, zipcode:'77389', telephone:'(832)484-5000',type:'High School'}
        ,{name:'LA PORTE H S', street:'1002 SAN JACINTO', city:'LA PORTE', state_code:47, zipcode:'77571', telephone:'(281)604-7500',type:'High School'}
        ,{name:'LAMAR H S', street:'3325 WESTHEIMER RD', city:'HOUSTON', state_code:47, zipcode:'77098', telephone:'(713)522-5960',type:'High School'}
        ,{name:'LANGHAM CREEK H S', street:'17610 FM 529', city:'HOUSTON', state_code:47, zipcode:'77095', telephone:'(281)463-5400',type:'High School'}
        ,{name:'LEE H S', street:'P O BOX 30', city:'BAYTOWN', state_code:47, zipcode:'77522', telephone:'(281)420-4535',type:'High School'}
        ,{name:'MACARTHUR H S', street:'4400 ALDINE MAIL RT', city:'HOUSTON', state_code:47, zipcode:'77039', telephone:'(281)985-6330',type:'High School'}
        ,{name:'MARSHALL H S', street:'1900 MAVERICK DR', city:'MARSHALL', state_code:47, zipcode:'75670', telephone:'(903)927-8800',type:'High School'}
        ,{name:'MAYDE CREEK H S', street:'19202 GROSCHKE RD', city:'HOUSTON', state_code:47, zipcode:'77084', telephone:'(281)237-3063',type:'High School'}
        ,{name:'MEMORIAL H S', street:'935 ECHO LN', city:'HOUSTON', state_code:47, zipcode:'77024', telephone:'(713)251-2500',type:'High School'}
        ,{name:'MIDDLE COLLEGE H S AT HCC FRAGA', street:'301 N DRENNAN', city:'HOUSTON', state_code:47, zipcode:'77003', telephone:'(713)228-3408',type:'High School'}
        ,{name:'MIDDLE COLLEGE H S AT HCC GULFTON', street:'5407 GULFTON ST 219', city:'HOUSTON', state_code:47, zipcode:'77081', telephone:'(713)662-2551',type:'High School'}
        ,{name:'MILBY H S', street:'7414 ST LO RD', city:'HOUSTON', state_code:47, zipcode:'77033', telephone:'(713)928-7401',type:'High School'}
        ,{name:'MORTON RANCH H S', street:'21000 FRANZ RD', city:'KATY', state_code:47, zipcode:'77449', telephone:'(281)237-7800',type:'High School'}
        ,{name:'MOUNT CARMEL ACADEMY', street:'7155 ASHBURN ST', city:'HOUSTON', state_code:47, zipcode:'77061', telephone:'(713)643-2008',type:'High School'}
        ,{name:'NIMITZ H S', street:'2005 W W THORNE DR', city:'HOUSTON', state_code:47, zipcode:'77073', telephone:'(281)443-7480',type:'High School'}
        ,{name:'NORTH FOREST H S', street:'10725 MESA DR', city:'HOUSTON', state_code:47, zipcode:'77078', telephone:'(713)636-4300',type:'High School'}
        ,{name:'NORTH HOUSTON EARLY COLLEGE H S', street:'8001 FULTON ST BLDG C', city:'HOUSTON', state_code:47, zipcode:'77022', telephone:'(713)696-6168',type:'High School'}
        ,{name:'NORTH SHORE SENIOR HIGH', street:'353 N CASTLEGORY', city:'HOUSTON', state_code:47, zipcode:'77049', telephone:'(832)386-4100',type:'High School'}
        ,{name:'NORTHBROOK H S', street:'1 RAIDER CIR', city:'HOUSTON', state_code:47, zipcode:'77080', telephone:'(713)251-2800',type:'High School'}
        ,{name:'NORTHSIDE H S', street:'1101 QUITMAN', city:'HOUSTON', state_code:47, zipcode:'77009', telephone:'(713)226-4900',type:'High School'}
        ,{name:'PASADENA MEMORIAL H S', street:'4410 CRENSHAW', city:'PASADENA', state_code:47, zipcode:'77504', telephone:'(281)991-2440',type:'High School'}
        ,{name:'PERFOR & VIS ARTS H S', street:'4001 STANFORD', city:'HOUSTON', state_code:47, zipcode:'77006', telephone:'(713)942-1960',type:'High School'}
        ,{name:'PREMIER H S OF NORTH HOUSTON', street:'P O BOX 292730', city:'LEWISVILLE', state_code:47, zipcode:'75029', telephone:'(972)316-3663',type:'High School'}
        ,{name:'PRO-VISION H S', street:'4590 WILMINGTON ST', city:'HOUSTON', state_code:47, zipcode:'77051', telephone:'(713)748-0030',type:'High School'}
        ,{name:'QUEST EARLY COLLEGE H S', street:'1700 WILSON RD', city:'HUMBLE', state_code:47, zipcode:'77338', telephone:'(281)641-7300',type:'High School'}
        ,{name:'RAINES H S', street:'1732 KATYLAND DR', city:'KATY', state_code:47, zipcode:'77493', telephone:'(281)237-1500',type:'High School'}
        ,{name:'RAUL YZAGUIRRE SCHOOL FOR SUCCESS', street:'2950 BROADWAY ST', city:'HOUSTON', state_code:47, zipcode:'77017', telephone:'(713)640-3700',type:'High School'}
        ,{name:'RICHARD MILBURN ACADEMY HOUSTON (SUBURBAN)', street:'713 E AIRTEX DR', city:'HOUSTON', state_code:47, zipcode:'77073', telephone:'(281)209-3505',type:'High School'}
        ,{name:'RICHARD MILBURN ACADEMY PASADENA', street:'171 PASADENA TOWN SQUARE', city:'PASADENA', state_code:47, zipcode:'77506', telephone:'(832)730-4570',type:'High School'}
        ,{name:'SAM RAYBURN H S', street:'2121 CHERRYBROOK LN', city:'PASADENA', state_code:47, zipcode:'77502', telephone:'(713)477-3601',type:'High School'}
        ,{name:'SCARBOROUGH H S', street:'4141 COSTA RICA', city:'HOUSTON', state_code:47, zipcode:'77092', telephone:'(713)613-2200',type:'High School'}
        ,{name:'SHARPSTOWN H S', street:'7504 BISSONNET ST', city:'HOUSTON', state_code:47, zipcode:'77074', telephone:'(713)771-7215',type:'High School'}
        ,{name:'SOUTH EARLY COLLEGE H S', street:'1930 AIRPORT BLVD', city:'HOUSTON', state_code:47, zipcode:'77051', telephone:'(713)732-3623',type:'High School'}
        ,{name:'SOUTH HOUSTON HIGH SCHOOL', street:'3820 S SHAVER', city:'SO HOUSTON', state_code:47, zipcode:'77587', telephone:'(713)740-0350',type:'High School'}
        ,{name:'SPRING H S', street:'19428 INTERSTATE 45 N', city:'SPRING', state_code:47, zipcode:'77373', telephone:'(281)891-7004',type:'High School'}
        ,{name:'SPRING WOODS H S', street:'2045 GESSNER', city:'HOUSTON', state_code:47, zipcode:'77080', telephone:'(713)251-3100',type:'High School'}
        ,{name:'STERLING H S', street:'11625 MARTINDALE RD', city:'HOUSTON', state_code:47, zipcode:'77048', telephone:'(713)991-0510',type:'High School'}
        ,{name:'STERLING H S', street:'P O BOX 30', city:'BAYTOWN', state_code:47, zipcode:'77522', telephone:'(281)420-4500',type:'High School'}
        ,{name:'STRATFORD H S', street:'14555 FERN ST', city:'HOUSTON', state_code:47, zipcode:'77079', telephone:'(713)251-3400',type:'High School'}
        ,{name:'SUMMER CREEK H S', street:'14000 WECKFORD BLVD', city:'HOUSTON', state_code:47, zipcode:'77044', telephone:'(281)641-5400',type:'High School'}
        ,{name:'TAYLOR H S', street:'20700 KINGSLAND BLVD', city:'KATY', state_code:47, zipcode:'77450', telephone:'(281)237-3100',type:'High School'}
        ,{name:'TAYLOR H S', street:'7555 HOWELL SUGAR LAND RD', city:'HOUSTON', state_code:47, zipcode:'77083', telephone:'(281)988-3500',type:'High School'}
        ,{name:'THE SUMMIT (HIGH SCHOOL)', street:'1838 E SAM HOUSTON PKWY S', city:'PASADENA', state_code:47, zipcode:'77503', telephone:'(713)740-0290',type:'High School'}
        ,{name:'THERAPEUTIC EDUCATION PROGRAM', street:'7302 KLEINGREEN LN', city:'KLEIN', state_code:47, zipcode:'77379', telephone:'(832)249-4365',type:'High School'}
        ,{name:'TOMBALL H S', street:'30330 QUINN RD', city:'TOMBALL', state_code:47, zipcode:'77375', telephone:'(281)357-3220',type:'High School'}
        ,{name:'TOMBALL MEMORIAL H S', street:'19100 NORTHPOINTE RIDGE LN', city:'TOMBALL', state_code:47, zipcode:'77377', telephone:'(281)357-3230',type:'High School'}
        ,{name:'VICTORY EARLY COLLEGE H S', street:'2330 S VICTORY ST', city:'HOUSTON', state_code:47, zipcode:'77088', telephone:'(281)878-7885',type:'High School'}
        ,{name:'VICTORY PREPARATORY ACADEMY SOUTH', street:'6011 W OREM', city:'HOUSTON', state_code:47, zipcode:'77085', telephone:'(832)547-2524',type:'High School'}
        ,{name:'WALTRIP H S', street:'1900 W 34TH ST', city:'HOUSTON', state_code:47, zipcode:'77018', telephone:'(713)688-1361',type:'High School'}
        ,{name:'WASHINGTON B T H S', street:'119 E 39TH ST', city:'HOUSTON', state_code:47, zipcode:'77018', telephone:'(713)696-6600',type:'High School'}
        ,{name:'WASKOM H S', street:'P O BOX 748', city:'WASKOM', state_code:47, zipcode:'75692', telephone:'(903)687-3361',type:'High School'}
        ,{name:'WESTBURY H S', street:'11911 CHIMNEY ROCK', city:'HOUSTON', state_code:47, zipcode:'77035', telephone:'(713)723-6015',type:'High School'}
        ,{name:'WESTFIELD H S', street:'16713 ELLA BLVD', city:'HOUSTON', state_code:47, zipcode:'77090', telephone:'(281)891-7132',type:'High School'}
        ,{name:'WESTSIDE H S', street:'14201 BRIAR FOREST', city:'HOUSTON', state_code:47, zipcode:'77077', telephone:'(281)920-8000',type:'High School'}
        ,{name:'WHEATLEY H S', street:'4801 PROVIDENCE', city:'HOUSTON', state_code:47, zipcode:'77020', telephone:'(713)671-3900',type:'High School'}
        ,{name:'WISDOM H S', street:'6529 BEVERLY HILL LN', city:'HOUSTON', state_code:47, zipcode:'77057', telephone:'(713)787-1700',type:'High School'}
        ,{name:'WORTHING H S', street:'9215 SCOTT ST', city:'HOUSTON', state_code:47, zipcode:'77051', telephone:'(713)733-3433',type:'High School'}
        ,{name:'YATES H S', street:'3703 SAMPSON ST', city:'HOUSTON', state_code:47, zipcode:'77004', telephone:'(713)748-5400',type:'High School'}
])

http.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});