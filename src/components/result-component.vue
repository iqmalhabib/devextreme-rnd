<template>
    <div>
        <h1>Maklumat yang dihantar</h1>
        <p>Nama: {{ nama }}</p>
        <p>Umur: {{ umur }}</p>
        <p>Jantina: {{ jantina }}</p>
    </div>
</template>

<script>
export default{
    props:{
        nama: String,
        umur: String,
        jantina: String
    }
};
</script>