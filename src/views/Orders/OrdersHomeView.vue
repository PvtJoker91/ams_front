<template>
    <div class="container-fluid"> 
      <h2 class="alert alert-danger mt-2">Search and order documents</h2>
      <div class="container-fluid">
        <div style="width:100%; height:1px; clear:both;"></div>
            <div id="line_block_2">
                <button id="big_button" @click="redirect(this.orderCreate)">Create order</button>
            </div> 
            <div id="line_block_2">
                <button id="big_button" @click="redirect(this.search)">Search dossiers</button>
            </div> 
            <div id="line_block_2" >
                <button id="big_button" @click="redirect(this.myorders)">My orders</button>       
            </div>
          <div style="width:100%; height:1px; clear:both;"></div>
      </div>
    </div>
</template>

<script>
export default{
data(){
    return{
    orderCreate: 'orderCreate',
    search: 'dossierSearch',
    myorders: 'myorders',
}
},
methods: {
    redirect(name){
        this.$router.push({ name: name });
    }
}
}
</script>