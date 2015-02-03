console.log("hello world");
Studenti = new Mongo.Collection('studenti');
if (Meteor.isClient) {
    Template.studenti.events({
            'click td': function () {
                console.log("You clicked td" + this.name);
                Session.set('SceltoStudente', this._id);
                var studente = Session.get('SceltoStudente');
                console.log(studente);
            },
            'click .increment': function () {
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
        var currentUserId = Meteor.userId();
        event.preventDefault();
        var nomeStudente = event.target.studentenom.value;
        console.log(nomeStudente);
        console.log("baubau");
        Studenti.insert({
nome : nomeStudente,
presenze: 0,
            creato: currentUserId
});

    },
    'click .remove': function(){
var selezione = Session.get('SceltoStudente');
        Studenti.remove(selezione);
}
});
Template.studenti.helpers({
    'studenti': function () {
        var currentUserId = Meteor.userId();
        return Studenti.find(
            {creato: currentUserId},{
            sort: {
                presenze: -1
            }}
        )
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
    console.log("Hello server");
}