<template>
    <div class="space-y-3">
        <h2 class="text-3xl font-bold mb-4">Search and order documents</h2>


    <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
        <RouterLink to="/orders/create">
        <div class="main-left">
            <div class="p-12 bg-white border border-gray-200 rounded-lg text-center">
                <h1 class="mb-6 text-2xl">Create order</h1>
            </div>
        </div>
        </RouterLink>

    

        <RouterLink to="/orders/myorders">
        <div class="main-right">
            <div class="p-12 bg-white border border-gray-200 rounded-lg text-center">
                <h1 class="mb-6 text-2xl">My orders</h1>
            </div>
        </div>
        </RouterLink>
    </div>
    </div>

</template>
