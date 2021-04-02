<template>
    <div>
        <div class="card shadow mb-4">
            <!-- Card Header - Accordion -->
            <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button"
               aria-expanded="true" aria-controls="collapseCardExample">
                <h6 class="m-0 font-weight-bold text-primary" v-if="!this.isEdit">Créer un disque</h6>
                <h6 class="m-0 font-weight-bold text-primary" v-else>modifier les infos</h6>
            </a>
            <!-- Card Content - Collapse -->
            <div class="collapse show" id="collapseCardExample" style="">
                <div class="card-body">
                    <form class="g-3" @submit.prevent="validateBeforeSubmit" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="categorie_id" class="form-label">Catégorie</label>
                                <div>
                                    <select id="categorie_id" class="form-control" v-model="disqueData.categorie_id">
                                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.nom }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="realisateur_id" class="form-label">Réalisateur</label>
                                <div>
                                    <select id="realisateur_id" class="form-control"
                                            v-model="disqueData.realisateur_id">
                                        <option v-for="real in realisateurs" :key="real.id" :value="real.id">
                                            {{ real.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="inputnom" class="form-label">Nom</label>
                                <input type="text" v-model="disqueData.nom"
                                       @input="$v.disqueData.nom.$touch()"
                                       class="form-control" id="inputnom">
                                <p class="text-danger" v-if="!$v.disqueData.nom.required">Le champ nom est réquis</p>
                            </div>
                            <div class="col-md-6">
                                <label for="inputphoto" class="form-label">photo</label>
                                <input type="file" v-on:change="onChange" class="form-control" id="inputphoto">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="inputdescription" class="form-label">Description</label>
                                <textarea type="text" v-model="disqueData.description"
                                          @input="$v.disqueData.description.$touch()"
                                          class="form-control" id="inputdescription">
                                </textarea>
                                <p class="text-danger" v-if="!$v.disqueData.description.required">Le champ description
                                    est
                                    réquis</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="inputdate" class="form-label">Date de publication</label>
                                <input type="date" v-model="disqueData.date_sortie" class="form-control" id="inputdate">
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
import {mapActions, mapState} from "vuex"

const {required, minLength} = require('vuelidate/lib/validators')
export default {
    data() {
        return {
            disqueData: {
                id: '',
                slug: '',
                nom: '',
                img: '',
                description: '',
                realisateur_id: 0,
                categorie_id: 0,
                date_sortie: ''
            },
            submitted: false,
            isLoading: false
        }
    },
    validations: {
        disqueData: {
            nom: {
                required
            },
            description: {
                required
            },
            categorie_id: {
                required
            },
            realisateur_id: {
                required
            }
        },
    },
    computed: {
        isEdit() {
            return this.$route.name === 'disque.edit';
        },
        ...mapState('Realisateurs', ['realisateurs']),
        ...mapState('Categorie', ['categories']),
    },
    watch: {
        $route(to, from) {
            if (!this.isEdit) {
                this.disqueData.id = ""
                this.disqueData.categorie_id = 0
                this.disqueData.realisateur_id = 0
                this.disqueData.nom = ""
                this.disqueData.slug = ""
                this.disqueData.description = ""
                this.disqueData.date_sortie = ""
            }
        }
    },
    mounted() {
        if (this.isEdit) {
            this.loadEditData()
        }
        this.fetchSelectData()
    },
    methods: {
        ...mapActions('Realisateurs', ['FETCH_REALISATEURS', 'FETCH_REALISATEUR']),
        ...mapActions('Categorie', ['FETCH_CATEGORIES', 'FETCH_CATEGORIE']),
        onChange(e) {
            this.disqueData.img = e.target.files[0];
        },
        /* enregistrement */
        async validateBeforeSubmit() {
            this.$v.disqueData.$touch()
            if (this.$v.$invalid) {
                return true
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            let data = new FormData();
            data.append('nom', this.disqueData.nom)
            data.append('img', this.disqueData.img);
            data.append('description', this.disqueData.description);
            data.append('categorie_id', this.disqueData.categorie_id);
            data.append('realisateur_id', this.disqueData.realisateur_id);
            data.append('date_sortie', this.disqueData.date_sortie);

            this.isLoading = true
            if (this.isEdit) {
                await window.axios.put(`/api/auth/disque/${this.$route.params.id}`, this.disqueData).then(response => {
                    this.$router.push('/admin/disques')
                    this.isLoading = false
                }).catch(error => {
                    let msg = ""
                    if (error.response.data.error.nom) {
                        msg = error.response.data.error.nom[0]
                    } else if (error.response.data.error.description) {
                        msg = error.response.data.error.description[0]
                    } else if (error.response.data.error.categorie_id) {
                        msg = error.response.data.error.categorie_id[0]
                    } else if (error.response.data.error.realisateur_id) {
                        msg = error.response.data.error.realisateur_id[0]
                    } else if (error.response.data.error.date_sortie) {
                        msg = error.response.data.error.date_sortie[0]
                    } else {
                        msg = "Une erreur est survenue , veuillez réessayer SVP";
                    }
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: msg
                    })
                    this.isLoading = false
                })
            } else {
                await window.axios.post(`/api/auth/disque`, data, config).then(response => {
                    this.$router.push('/admin/disques')
                    this.isLoading = false
                }).catch(error => {
                    this.isLoading = false
                    let msg = ""
                    if (error.response.data.error.nom) {
                        msg = error.response.data.error.nom[0]
                    } else if (error.response.data.error.img) {
                        msg = error.response.data.error.img[0]
                    } else if (error.response.data.error.description) {
                        msg = error.response.data.error.description[0]
                    } else if (error.response.data.error.categorie_id) {
                        msg = error.response.data.error.categorie_id[0]
                    } else if (error.response.data.error.realisateur_id) {
                        msg = error.response.data.error.realisateur_id[0]
                    } else if (error.response.data.error.date_sortie) {
                        msg = error.response.data.error.date_sortie[0]
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
            await window.axios.get(`/api/auth/disque/` + this.$route.params.id).then(response => {
                vm.disqueData.nom = response.data.disque.nom
                vm.disqueData.description = response.data.disque.description
                vm.disqueData.categorie_id = response.data.disque.categorie_id
                vm.disqueData.realisateur_id = response.data.disque.realisateur_id
                vm.disqueData.date_sortie = response.data.disque.date_sortie
                vm.isLoading = false
            }).catch(error => {
                this.isLoading = false
                console.log(error)
            })
        },
        async fetchSelectData() {
            await this.FETCH_REALISATEURS()
            await this.FETCH_CATEGORIES()
        }
    },
}
</script>
