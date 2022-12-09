let arr = [
    { name:"string 1", value:"this", other: "that" },
    { name:"string 2", value:"this", other: "that" }
];
var obj;
arr.find((o, i) => {
    if (o.name === 'string 1') {
        obj=true;
        return true; // stop searching
    }
    else{
        obj=false;
    }
});
if(obj){
    console.log("found");
}
else{
    console.log("not found")
}
