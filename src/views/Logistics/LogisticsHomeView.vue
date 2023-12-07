<template>
    <div class="container-fluid"> 
      <h2 class="alert alert-danger mt-2">Logistics</h2>
      <div class="container-fluid">
        <div style="width:100%; height:1px; clear:both;"></div>
                    <div id="line_block_2">
                      <button id="big_button" @click="redirect(this.checking)">Checking</button>
   
                      </div> 
                    <div id="line_block_2" >
                      <button id="big_button" @click="redirect(this.completion)">Completion</button>       
                    </div>
                    <div id="line_block_2" >
                      <button id="big_button" @click="redirect(this.placement)">Placement</button>       
                    </div>
          <div style="width:100%; height:1px; clear:both;"></div>
      </div>
    </div>
</template>

<script>
export default{
data(){return{
    completion: 'completion',
    placement: 'placement',
    checking: 'checking'
}
},
methods: {
    redirect(name){
        this.$router.push({ name: name });
    }
}
}
</script>