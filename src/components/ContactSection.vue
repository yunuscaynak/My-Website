<template>
  <section id="contact" class="container mx-auto px-4 py-10">
    <h1 class="text-white font-bruno text-4xl mb-8">Contact Me</h1>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Contact Form -->
      <div class="w-full lg:w-1/2">
        <form @submit.prevent="submitForm">
          <!-- Name Input -->
          <div class="mb-6 relative">
            <label for="name" class="font-bruno text-lg text-white block mb-2">
              Your Name
            </label>
            <input
              v-model="formData.name"
              type="text"
              id="name"
              class="font-bruno text-lg w-full p-3 rounded-lg bg-gray-800 text-white border-2 focus:border-blue-500 transition-colors"
              :class="{ 'border-red-500': errors.name }"
              placeholder="Enter your name"
              @input="validateName"
            />
            <span v-if="errors.name" class="text-red-500 text-sm mt-1 block">
              {{ errors.name }}
            </span>
            <svg
              v-if="errors.name"
              class="w-5 h-5 absolute right-3 top-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <!-- Email Input -->
          <div class="mb-6 relative">
            <label for="email" class="font-bruno text-lg text-white block mb-2">
              Your Email
            </label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              class="font-bruno text-lg w-full p-3 rounded-lg bg-gray-800 text-white border-2 focus:border-blue-500 transition-colors"
              :class="{ 'border-red-500': errors.email }"
              placeholder="Enter your email"
              @input="validateEmail"
            />
            <span v-if="errors.email" class="text-red-500 text-sm mt-1 block">
              {{ errors.email }}
            </span>
            <svg
              v-if="errors.email"
              class="w-5 h-5 absolute right-3 top-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <!-- Message Input -->
          <div class="mb-6 relative">
            <label
              for="message"
              class="font-bruno text-lg text-white block mb-2"
            >
              Your Message
            </label>
            <textarea
              v-model="formData.message"
              id="message"
              class="font-bruno text-lg w-full p-3 rounded-lg bg-gray-800 text-white border-2 focus:border-blue-500 transition-colors resize-none"
              :class="{ 'border-red-500': errors.message }"
              placeholder="Enter your message"
              rows="5"
              @input="validateMessage"
            ></textarea>
            <span v-if="errors.message" class="text-red-500 text-sm mt-1 block">
              {{ errors.message }}
            </span>
            <svg
              v-if="errors.message"
              class="w-5 h-5 absolute right-3 top-28 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <button
            type="submit"
            class="font-bruno text-lg w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>

        <!-- Success Message -->
        <div
          v-if="showSuccess"
          class="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg transition-all duration-300"
          :class="
            successMessage
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          "
        >
          <strong class="font-bold">Success!</strong>
          <span class="ml-2">{{ successMessage }}</span>
        </div>
      </div>

      <!-- Social Media -->
      <div class="w-full lg:w-1/2 flex flex-col items-center justify-center">
        <h2 class="font-bruno text-4xl text-white mb-8">Follow Me</h2>
        <div class="flex gap-6 flex-wrap justify-center">
          <a
            v-for="(social, index) in socials"
            :key="index"
            :href="social.url"
            target="_blank"
            class="flex justify-center items-center w-16 h-16 rounded-full bg-white hover:bg-gray-200 transition-all duration-300 hover:scale-110 text-gray-800"
          >
            <component :is="social.icon" class="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase/config";
import { InstagramIcon, GithubIcon, LinkedinIcon } from "lucide-vue-next";

const socials = [
  {
    url: "https://www.instagram.com/yunus404_/",
    icon: InstagramIcon,
  },
  {
    url: "https://github.com/yunuscaynak",
    icon: GithubIcon,
  },
  {
    url: "https://www.linkedin.com/in/yunus-caynak-738858214/",
    icon: LinkedinIcon,
  },
];

const db = getFirestore(app);
const formData = reactive({ name: "", email: "", message: "" });
const errors = reactive({ name: "", email: "", message: "" });
const successMessage = ref("");
const showSuccess = ref(false);

const validateName = () => {
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  } else {
    errors.name = "";
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Invalid email format";
  } else {
    errors.email = "";
  }
};

const validateMessage = () => {
  if (!formData.message.trim()) {
    errors.message = "Message is required";
  } else {
    errors.message = "";
  }
};

const submitForm = async () => {
  validateName();
  validateEmail();
  validateMessage();

  if (Object.values(errors).some((error) => error !== "")) return;

  try {
    await addDoc(collection(db, "messages"), formData);
    successMessage.value = "Message sent successfully!";
    showSuccess.value = true;

    // Reset form
    formData.name = "";
    formData.email = "";
    formData.message = "";

    // Hide success message after 3 seconds
    setTimeout(() => {
      showSuccess.value = false;
      setTimeout(() => (successMessage.value = ""), 300);
    }, 3000);
  } catch (error) {
    console.error("Error sending message:", error);
    successMessage.value = "Error sending message. Please try again.";
    showSuccess.value = true;
    setTimeout(() => (showSuccess.value = false), 3000);
  }
};
</script>
