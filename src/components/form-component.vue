<template> 
    <div>
        <h1>Sila isi</h1>
        <form @submit.prevent="submitForm">
            <label for="nama">Nama:</label>
            <input type="text" id="nama" v-model="nama">
            
            <label for="umur">Umur</label>
            <input type="number" id="umur" v-model="umur"/>
        
            <label for="jantina">Jantina</label>
            <select v-model="jantina">
                <option value="Lelaki">Lelaki</option>
                <option value="Perempuan">Perempuan</option>
            </select>

            <button type="submit">Hantar</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            nama:'',
            umur:'',
            jantina:''
        };
    },
    methods:{
        submitForm(){
            //Emit data back to parent
            this.$emit('submitData',{
                nama: this.nama,
                umur: this.umur,
                jantina: this.jantina
            });
        }
    }
};
</script>