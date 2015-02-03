console.log("hello world");
Studenti = new Mongo.Collection('studenti');
if(Meteor.isClient){
    Template.studenti.events({
'click td': function(){
console.log("You clicked td");
    Session.set('SceltoStudente', this._id);
var studente = Session.get('SceltoStudente');
    console.log(studente);
}


});
console.log("Hello client");
    Template.studenti.helpers({
'studenti': function(){
return Studenti.find()
},
        'selectedClass': function(){
            var studentiId = this._id;
var studentiSelezionati = Session.get('SceltoStudente');
if(studentiId == studentiSelezionati){
return "selected"
}
        }


});}

if(Meteor.isServer){
console.log("Hello server");
}


