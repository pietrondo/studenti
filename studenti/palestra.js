console.log("hello world");
Studenti = new Mongo.Collection('studenti');
if (Meteor.isClient) {
    Meteor.subscribe("stud");
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
                Studenti.update(selezione, {
                    $inc: {
                        presenze: 1
                    }
                });

            },
            'click .decrement': function () {
                var selezione = Session.get('SceltoStudente');
                Studenti.update(selezione, {
                    $inc: {
                        presenze: -1
                    }
                });

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
}

if (Meteor.isServer) {
    Meteor.publish('stud', function(){
return Studenti.find()
});
    Meteor.methods({
    
        'inserisciStudenti': function (playerNameVar) {
            var currentUserId = Meteor.userId();
            console.log(currentUserId);
            console.log(Studenti.findOne("KRdE4kGWJCn2WizTY"));
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