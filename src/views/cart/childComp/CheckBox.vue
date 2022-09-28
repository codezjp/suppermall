<template>
    <div class="icon-selector" 
			@click="checkedClick"
			:class="{'isSelcted':isChecked}">
		<img src="~assets/img/cart/tick.svg" />
	</div>
</template>

<script>
export default {
    props:{
			isChecked:{
				type:Boolean,
				default:false
			}
		},
	methods:{
		checkedClick(){
			this.$emit("checkedclick");
		}
	}
}
</script>

<style scoped>
    	.icon-selector {
			    width: 18px;
			    height: 18px;
				line-height: 18px;
			    border-radius: 50%;
			    border: 2px solid #ccc;
			    cursor: pointer;
		 }
		.isSelcted{
			background-color: #ff8198;
			border-color: #ff8198;
		}
</style>