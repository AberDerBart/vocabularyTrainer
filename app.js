var app = new Vue({
	el:"#app",

	data: {
		revealed: false,
		languagePrim: {},
		languageSec: {},
		languages: [
			{name:"English", key:"en"}, 
			{name:"toki pona", key:"tp"},
			{name:"toki pona gestures", key:"gesture"},
			{name:"toki pona hieroglyphs", key:"glyph"}
		],
		vocabulary: [],
		current: {},
		training: []
	},

	methods: {
		reveal: function(){
			this.revealed = true
		},
		next: function(){
			this.current.right++
			var index = Math.floor(Math.random() * this.vocabulary.length)
			this.current = this.vocabulary[index]
			this.revealed = false
		},
		store: function(){
			console.log("Writing vocabulary to localStorage")
			localStorage.setItem("vocabulary", JSON.stringify(this.vocabulary))
		},
		add: function(){
			console.log("Adding word")
			this.vocabulary.push({en:"", tp:"", gesture:"", glyph:""})
		},
		del: function(word){
			this.vocabulary = this.vocabulary.filter(function(ele){
				return ele != word
			})
		},
		load: function(ev){
			console.log("Loading vocabulary from " + ev.target.files[0]);
			const reader = new FileReader()
			reader.onload = e => this.loaded(e.target.result)
			reader.readAsText(ev.target.files[0])
		},
		loaded: function(data){
			console.log("Loaded")
			this.vocabulary = JSON.parse(data)
		}
	},

	mounted() {
		if(localStorage.getItem("vocabulary")){
			console.log("Loading vocabulary from localStorage")
			this.vocabulary = JSON.parse(localStorage.getItem("vocabulary"))
		}
		this.languagePrim = this.languages[0].key
		this.languageSec = this.languages[1].key
		this.next()
	}
})
