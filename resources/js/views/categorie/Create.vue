<template>
    <div>
        <div class="card shadow mb-4">
            <!-- Card Header - Accordion -->
            <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button"
               aria-expanded="true" aria-controls="collapseCardExample">
                <h6 class="m-0 font-weight-bold text-primary" v-if="!this.isEdit">Créer une nouvelle categorie</h6>
                <h6 class="m-0 font-weight-bold text-primary" v-else>modifier une categorie</h6>
            </a>
            <!-- Card Content - Collapse -->
            <div class="collapse show" id="collapseCardExample" style="">
                <div class="card-body">
                    <form class="row g-3" @submit.prevent="validateBeforeSubmit">
                        <div class="col-md-6">
                            <label for="inputnom" class="form-label">Nom</label>
                            <input type="text" v-model="categorieData.nom" @input="$v.categorieData.nom.$touch()"
                                   class="form-control" id="inputnom">
                            <p class="text-danger" v-if="!$v.categorieData.nom.required">Le champ nom est réquis</p>
                        </div>
                        <div class="col-12 mt-2">
                            <input type="submit" class="btn btn-primary" value="enregistrer">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

const {required, email, minLength} = require('vuelidate/lib/validators')
export default {
    data() {
        return {
            categorieData: {
                id: '',
                slug: '',
                nom: ''
            },
            submitted: false,
            isLoading: false
        }
    },
    validations: {
        categorieData: {
            nom: {
                required
            }
        },
    },
    computed: {
        isEdit() {
            return this.$route.name === 'categorie.edit';
        },
    },
    watch: {
        $route(to, from) {
            if (!this.isEdit) {
                this.categorieData.id = ""
                this.categorieData.nom = ""
                this.categorieData.slug = ""
            }
        }
    },
    mounted() {
        if (this.isEdit) {
            this.loadEditData()
        }
    },
    methods: {
        ...mapActions('Categorie', ['SAVE_CATEGORIE', 'FETCH_CATEGORIE']),
        async validateBeforeSubmit() {
            axios.defaults.withCredentials = true
            this.$v.categorieData.$touch()
            if (this.$v.$invalid) {
                return true
            }

            this.isLoading = true
            if (this.isEdit) {

                await window.axios.put(`/api/auth/categorie/${this.$route.params.id}`, this.categorieData).then(response => {
                    this.isLoading = false
                    this.$router.push('/admin/categorie')
                }).catch(error => {
                    this.isLoading = false
                    let msg = ""
                    if (error.response.data.error.nom) {
                        msg = error.response.data.error.nom[0]
                    }
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: msg
                    })
                    console.log(error)
                })

            } else {
                try {
                    await this.SAVE_CATEGORIE(this.categorieData)
                    this.isLoading = false
                    this.$router.push('/admin/categorie')
                } catch (error) {
                    let msg = ""
                    if (error.response.data.error.nom) {
                        msg = error.response.data.error.nom[0]
                    }
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: msg
                    })
                    this.isLoading = false
                }
            }
        },
        async loadEditData() {
            let response = await this.FETCH_CATEGORIE(this.$route.params.id)
            this.categorieData.nom = response.nom
        }
    },
}
</script>
