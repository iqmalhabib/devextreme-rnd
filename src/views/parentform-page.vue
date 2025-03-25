<template>
    <div id="app">
        <formComponent @submitData="handleFormSubmit"/>
        <resultComponent :nama="nama" :umur="umur" :jantina="jantina" />
    </div>
</template>

<script>
import formComponent from '@/components/form-component.vue';
import resultComponent from '@/components/result-component.vue';

export default {
    components:{
        formComponent,
        resultComponent
    },
    data(){
        return{
            nama:'',
            umur:'',
            jantina:''
        };
    },
    methods:{
        handleFormSubmit(data){
            //update parent data based on the emitted event
            this.nama = data.nama;
            this.umur = data.umur;
            this.jantina = data.jantina
        }
    }
}

</script>