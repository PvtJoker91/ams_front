<template>
    <div class="space-y-3">
        <h2 class="text-3xl font-bold mb-4">Orders execution</h2>


    <div class="max-w-7xl mx-auto grid grid-cols-3 gap-4">
        <RouterLink to="/orders/list">
        <div class="main-left">
            <div class="p-8 bg-white border border-gray-200 rounded-lg text-center">
                <h1 class="mb-6 text-2xl">Orders</h1>
            </div>
        </div>
        </RouterLink>
        
        
        
        
        <RouterLink to="/orders/tasks">
        <div class="main-middle">
            <div class="p-8 bg-white border border-gray-200 rounded-lg text-center">
                <h1 class="mb-6 text-2xl">Tasks</h1>
            </div>
        </div>
        </RouterLink>

        <RouterLink to="/orders/tasks/execution">
        <div class="main-right">
            <div class="p-8 bg-white border border-gray-200 rounded-lg text-center">
                <h1 class="mb-6 text-2xl">Execute task</h1>
            </div>
        </div>
        </RouterLink>

    


    </div>
    </div>

</template>