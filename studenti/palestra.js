console.log("hello world");
Studenti = new Mongo.Collection('studenti');
if (Meteor.isClient) {
    Meteor.subscribe("stud");
        Meteor.subscribe("user");
 
    Template.studenti.events({
            'click td': function () {
                console.log("You clicked td" + this.name);
                Session.set('SceltoStudente', this._id);
                var studente = Session.get('SceltoStudente');
                console.log(studente);
            },
            'click .increment': function () {
                Meteor.call('sendLogMessage');

                var selezione = Session.get('SceltoStudente');
                Meteor.call('modifyPlayerScore', selezione);
                

            },
            'click .decrement': function () {
                var selezione = Session.get('SceltoStudente');
                                Meteor.call('abbassa', selezione);

                

            }

        }


    );
    Template.aggiungistudenti.events({
        'submit form': function (event) {
                        event.preventDefault();


            var studente = event.target.studentenom.value;
Meteor.call('inserisciStudenti', studente);


        },
        'click .remove': function () {
            var selezione = Session.get('SceltoStudente');
            Meteor.call('rimuoviStudenti',selezione);

        }
    });
    Template.studenti.helpers({
        'studenti': function () {
            var currentUserId = Meteor.userId();
            return Studenti.find()
        },
        'selectedClass': function () {
            var studentiId = this._id;
            var studentiSelezionati = Session.get('SceltoStudente');
            if (studentiId == studentiSelezionati) {
                return "selected"
            }
        },
        'mostraStudenti': function () {
            var SceltoStudente = Session.get('SceltoStudente');
            return Studenti.findOne(SceltoStudente)
        }


    });
    Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

}

if (Meteor.isServer) {
    Meteor.publish('stud', function(){
        var currentUserId = this.userId;
return Studenti.find({creato: currentUserId})
}); 
    
    
    Meteor.methods({
        'abbassa': function(sele){
        Studenti.update(sele, {
                    $inc: {
                        presenze: -1
                    }
                });
        
        },
    'modifyPlayerScore': function(selectedPlayer){
        Studenti.update(selectedPlayer, {
                    $inc: {
                        presenze: +1
                    }
                });
                
    },
        'inserisciStudenti': function (playerNameVar) {
            var currentUserId = this.userId;
            console.log(this.user);
            console.log(Meteor.user().username);
            Studenti.insert({
                nome: playerNameVar,
                giorno:"febbraio",
                presenze: 0,
                creato: currentUserId
            });
        },
        'rimuoviStudenti': function(selezione){
Studenti.remove(selezione);
        }
    });
}