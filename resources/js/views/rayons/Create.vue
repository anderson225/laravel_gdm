<template>
    <div>
        <div class="card shadow mb-4">
            <!-- Card Header - Accordion -->
            <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button"
               aria-expanded="true" aria-controls="collapseCardExample">
                <h6 class="m-0 font-weight-bold text-primary" v-if="this.isEdit">Créer un rayon</h6>
                <h6 class="m-0 font-weight-bold text-primary" v-else>modifier une rayon</h6>
            </a>
            <!-- Card Content - Collapse -->
            <div class="collapse show" id="collapseCardExample" style="">
                <div class="card-body">
                    <form class="row g-3" @submit.prevent="validateBeforeSubmit">
                        <div class="col-md-6">
                            <label for="inputnom" class="form-label">Nom</label>
                            <input type="text" v-model="rayonData.nom" @input="$v.rayonData.nom.$touch()"
                                   class="form-control" id="inputnom">
                            <p class="text-danger" v-if="!$v.rayonData.nom.required">Le champ nom est réquis</p>
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

const {required, minLength} = require('vuelidate/lib/validators')
export default {
    data() {
        return {
            rayonData: {
                id: '',
                slug: '',
                nom: ''
            },
            submitted: false,
            isLoading: false
        }
    },
    validations: {
        rayonData: {
            nom: {
                required
            }
        },
    },
    computed: {
        isEdit() {
            return this.$route.name === 'rayon.edit';
        },
    },
    watch: {
        $route(to, from) {
            if (!this.isEdit) {
                this.rayonData.id = ''
                this.rayonData.nom = ''
                this.rayonData.slug = ''
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
        /* enregistrement */
        async validateBeforeSubmit() {
            this.$v.rayonData.$touch()
            if (this.$v.$invalid) {
                return true
            }

            this.isLoading = true
            if (this.isEdit) {
                try {
                    await window.axios.put(`/api/auth/rayon/${this.$route.params.id}`, this.rayonData).then(response => {
                        this.isLoading = false
                        this.$router.back()
                    }).catch(error => {
                        this.isLoading = false
                        console.log(error)
                    })
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
            } else {
                await window.axios.post(`/api/auth/rayon`, this.rayonData).then(response => {
                    this.isLoading = false
                    this.$router.push('/admin/rayons')
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
                })
            }
        },
        /* charger la liste des données d'un rayon */
        async loadEditData() {
            await window.axios.get(`/api/auth/rayon`, this.rayonData).then(response => {
                this.rayonData.nom = response.nom
                this.isLoading = false
                this.$router.push('/admin/rayons')
            }).catch(error => {
                this.isLoading = false
                console.log(error)
            })
        }
    },
}
</script>
