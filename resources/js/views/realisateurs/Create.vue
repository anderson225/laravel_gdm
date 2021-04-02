<template>
    <div>
        <div class="card shadow mb-4">
            <!-- Card Header - Accordion -->
            <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button"
               aria-expanded="true" aria-controls="collapseCardExample">
                <h6 class="m-0 font-weight-bold text-primary" v-if="!this.isEdit">Créer un réalisateur</h6>
                <h6 class="m-0 font-weight-bold text-primary" v-else>modifier les infos</h6>
            </a>
            <!-- Card Content - Collapse -->
            <div class="collapse show" id="collapseCardExample" style="">
                <div class="card-body">
                    <form class="g-3" @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="inputnom" class="form-label">Nom</label>
                                <input type="text" v-model="realisateurData.nom"
                                       @input="$v.realisateurData.nom.$touch()"
                                       class="form-control" id="inputnom">
                                <p class="text-danger" v-if="!$v.realisateurData.nom.required">Le champ nom est
                                    réquis</p>
                            </div>
                            <div class="col-md-6">
                                <label for="inputphoto" class="form-label">photo</label>
                                <input type="file" v-on:change="onChange" class="form-control" id="inputphoto">
                            </div>
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
const {required, minLength} = require('vuelidate/lib/validators')
export default {
    data() {
        return {
            realisateurData: {
                id: '',
                slug: '',
                nom: '',
                photo: ''
            },
            submitted: false,
            isLoading: false
        }
    },
    validations: {
        realisateurData: {
            nom: {
                required
            }
        },
    },
    computed: {
        isEdit() {
            return this.$route.name === 'realisateur.edit';
        },
    },
    watch: {
        $route(to, from) {
            if (!this.isEdit) {
                this.realisateurData.id = ""
                this.realisateurData.nom = ""
                this.realisateurData.slug = ""
                this.realisateurData.photo = ""
            }
        }
    },
    mounted() {
        if (this.isEdit) {
            this.loadEditData()
        }
    },
    methods: {
        onChange(e) {
            this.realisateurData.photo = e.target.files[0];
        },
        /* enregistrement */
        async validateBeforeSubmit() {
            this.$v.realisateurData.$touch()
            if (this.$v.$invalid) {
                return true
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            let data = new FormData();
            data.append('nom', this.realisateurData.nom)
            data.append('photo', this.realisateurData.photo);

            this.isLoading = true
            if (this.isEdit) {
                try {
                    await window.axios.put(`/api/auth/realisateur/${this.$route.params.id}`, this.realisateurData).then(response => {
                        this.$router.push('/admin/realisateurs')
                        this.isLoading = false
                    }).catch(error => {
                        this.isLoading = false
                        console.log(error)
                    })
                } catch (error) {
                    this.isLoading = false
                    let msg = ""
                    if (error.response.data.error.nom) {
                        msg = error.response.data.error.nom[0]
                    } else {
                        msg = "Une erreur est survenue , veuillez réessayer SVP";
                    }
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: msg
                    })
                }
            } else {
                await window.axios.post(`/api/auth/realisateur`, data, config).then(response => {
                    this.$router.push('/admin/realisateurs')
                    this.isLoading = false
                }).catch(error => {
                    this.isLoading = false
                    let msg = ""
                    if (error.response.data.error.nom) {
                        msg = error.response.data.error.nom[0]
                    } else if (error.response.data.error.photo) {
                        msg = error.response.data.error.photo[0]
                    } else {
                        msg = "Une erreur est survenue , veuillez réessayer SVP";
                    }
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: msg
                    })
                    this.isLoading = false
                    console.log(error)
                })
            }
        },
        /* charger la liste des données d'un rayon */
        async loadEditData() {
            let vm = this
            await window.axios.get(`/api/auth/realisateur/` + this.$route.params.id).then(response => {
                vm.realisateurData.nom = response.data.realisateur.name
                vm.isLoading = false
            }).catch(error => {
                this.isLoading = false
                console.log(error)
            })
        }
    },
}
</script>
