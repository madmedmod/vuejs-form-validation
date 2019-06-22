Vue.use(vuelidate.default)

new Vue({
    el: '#app',
    
    data() {
        return {
            form: {
                name: null,
                age: null
            }
        }
    },

    validations: {
        form: {
            name: {
                required: validators.required
            },
            
            age: {
                required: validators.required, // $v.form.age.required
                integer: validators.integer, // $v.form.age.integer
                // min: validators.minValue(12),
                // max: validators.maxValue(120),
                between: validators.between(12, 120) // $v.form.age.between
            },

            email: {
                email: validators.email
            }
        }
    },

    computed: {
        nameIsValid(){
            return !!this.form.name
        },

        ageIsValid(){
            return typeof this.form.age === 'number' && this.form.age > 12 && this.form.age < 120
        },

        formIsValid(){
            return this.nameIsValid && this.ageIsValid
        }
    },

    methods: {
        submitForm(){
            // this.$v.form.name.$touch() >>> ini untuk touch(bikin dirty ketika klik submit button) input namanya aja
            // this.$v.form.age.$touch() >>> ini utk input age nya aja
            this.$v.form.$touch() // ini untuk semua input di form nya, dan best practice pake yg ini
            this.$v.$touch() // ini untuk touch semua elemen termasuk selain form, lebih baik ga pake ini biar ga ganggu elemen lain
            if (!this.$v.form.$invalid) {
                console.log('📝 Form Submitted', this.form)
            } else {
                console.log('❌ Invalid form')
            }
        }
    }
})