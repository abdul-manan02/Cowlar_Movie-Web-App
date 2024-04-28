<template>
  <div class="h-[55vh] overflow-hidden relative">
    <img src="../assets/JohnWick.png" alt="" class="w-full object-contain" />
    <div class="absolute top-3 left-3 w-full text-white bg-transparent">
      <div class="flex justify-between">
        <div class="flex items-center">
          <img src="../assets/logo.png" alt="" />
          <h2>MovieMania</h2>
        </div>
        <div
          class="pt-2 mx-auto text-gray-600 relative flex items-center w-[20%]"
        >
          <input
            class="border-2 border-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none bg-transparent w-full"
            type="search"
            name="search"
            placeholder="What do you want to watch?"
          />
          <button
            type="submit"
            class="absolute right-0 top-7 transform -translate-y-1/2 mr-3"
          >
            <svg
              class="text-white h-3 w-3 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style="enable-background: new 0 0 56.966 56.966"
              xml:space="preserve"
              width="512px"
              height="512px"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>
