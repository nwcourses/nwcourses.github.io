
AFRAME.registerComponent("helloworld", {
    schema: {
        greeting: {
            type: 'string',
            default: 'Hello World!'
        },
    },

    init: function() {
        alert(this.data.greeting);
    }
});
