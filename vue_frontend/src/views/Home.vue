<template>
  <div class="home">
    <div class="grid grid-cols-1 p-12">
      <div class="flex justify-center">
        <div style="width: 500px;" class="bg-gray-100 shadow-lg p-8">
          <div class="flex justify-center text-2xl uppercase font-semibold">
            <h1>Welcome to Your Vue.js App</h1>
          </div>
          <div class="flex mt-5 justify-center text-md text-gray-500 mt-2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              repudiandae magni quo saepe praesentium voluptate deleniti placeat
            </p>
          </div>
          <!--Border-->
          <div
            v-if="item.secret"
            class="bg-green-50 mt-5 rounded-lg border-l-solid border-l-8 border-green-300"
          >
            <div class="max-w-7xl mx-auto py-2 px-3 sm:px-6 lg:px-6">
              <div class="flex items-center justify-between flex-wrap">
                <div class="w-0 flex-1 flex items-center">
                  <p class="ml-1 font-medium text-gray-900">
                    <span v-text="item.secret">
                      
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex w-full mt-5">
            <div class="w-full">
              <label
                for="about"
                class="block text-sm font-medium text-gray-700"
              >
                Add or Retrive a secret
              </label>
              <div class="mt-1">
                <textarea
                  id="secret"
                  name="secret"
                  rows="4"
                  v-model="item.secret"
                  class="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <p class="text-sm mt-1 text-gray-600">
                Create a secret or retrive a secret. Paste the url and click
                retrive or create a new one and submit
              </p>
            </div>
          </div>
          <div class="flex mt-8 justify-end">
            <button
              type="button"
              @click="retrive"
              style="width: 100px"
              class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto"
            >
              <Loading v-if="retriving" />
              <span v-else>Retrive</span>
            </button>
            <button
              type="button"
              @click="submit"
              style="width: 100px"
              class="ml-2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
            >
              <Loading v-if="saving" />
              <span v-else>Submit</span>
            </button> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { savesecret, retrivesecret } from "../scripts";
import Loading from "../components/Loading";
export default {
  name: "Home",
  components: { Loading },
  data() {
    return {
      item: {
        secret: null,
        expireAfter: null,
        expireAfterViews: null
      },
      saving: false,
      retriving: false
    };
  },
  methods: {
    // * save secret
    async submit() {
      this.saving = true;
      const response = await savesecret(this.item);
      this.item = {
        secret: null,
        expireAfter: null,
        expireAfterViews: null
      };
      // response
      if (response) {
        return response;
      }

      // timeout
      setTimeout(() => {
        this.saving = false;
      }, 1000);
    },
    // * retrive secret
    async retrive() {
      this.retriving = true;
      const response = await retrivesecret(this.item.secret);
      this.item = {
        secret: null,
        expireAfter: null,
        expireAfterViews: null
      };
      if (response) {
        return response;
      }

      // timeout
      setTimeout(() => {
        this.retriving = false;
      }, 1000);
    }
  }
};
</script>
