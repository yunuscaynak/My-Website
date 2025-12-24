<template>
  <section id="contact" class="py-16">
    <div class="sectionShell">
      <div class="sectionHeader">
        <p class="eyebrow">Contact</p>
        <h1 class="title">Let’s build something bold.</h1>
        <p class="lede">
          Drop a line for collaborations, freelance work, or just to say hi. I respond fast.
        </p>
      </div>

      <div class="contentGrid">
        <div class="glassCard">
          <div class="cardHeading">
            <span class="beam"></span>
            <h2>Send a message</h2>
          </div>
          <form @submit.prevent="submitForm" class="space-y-5">
            <div class="field">
              <label for="name">Your Name</label>
              <input
                v-model="formData.name"
                id="name"
                type="text"
                placeholder="Ada Lovelace"
                :class="{ error: errors.name }"
                @input="validateName"
              />
              <p v-if="errors.name" class="errorText">{{ errors.name }}</p>
            </div>

            <div class="field">
              <label for="email">Your Email</label>
              <input
                v-model="formData.email"
                id="email"
                type="email"
                placeholder="you@example.com"
                :class="{ error: errors.email }"
                @input="validateEmail"
              />
              <p v-if="errors.email" class="errorText">{{ errors.email }}</p>
            </div>

            <div class="field">
              <label for="message">Your Message</label>
              <textarea
                v-model="formData.message"
                id="message"
                rows="4"
                placeholder="Tell me about your project..."
                :class="{ error: errors.message }"
                @input="validateMessage"
              ></textarea>
              <p v-if="errors.message" class="errorText">{{ errors.message }}</p>
            </div>

            <button type="submit" class="cta">Send Message</button>
          </form>
        </div>

        <div class="infoPanel">
          <div class="cardHeading">
            <span class="beam"></span>
            <h2>Reach out</h2>
          </div>
          <p class="infoText">
            Based in Turkiye, collaborating remotely worldwide. I’m open to product builds, UI revamps, and front-end consulting.
          </p>

          <div class="chipRow">
            <span class="chip">Available for freelance</span>
            <span class="chip">Remote friendly</span>
            <span class="chip">Rapid response</span>
          </div>

          <div class="socialGrid">
            <a
              v-for="(social, index) in socials"
              :key="index"
              :href="social.url"
              target="_blank"
              class="socialCard"
            >
              <component :is="social.icon" class="icon" />
              <span>{{ social.label }}</span>
            </a>
          </div>
        </div>
      </div>

      <div
        v-if="showSuccess"
        class="toast"
        :class="successMessage ? 'toastVisible' : 'toastHidden'"
      >
        <strong>Success!</strong>
        <span class="ml-2">{{ successMessage }}</span>
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
    label: "Instagram",
  },
  {
    url: "https://github.com/yunuscaynak",
    icon: GithubIcon,
    label: "GitHub",
  },
  {
    url: "https://www.linkedin.com/in/yunus-caynak-738858214/",
    icon: LinkedinIcon,
    label: "LinkedIn",
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

<style scoped>
.sectionShell {
  @apply relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-10 sm:px-10 backdrop-blur;
}

.sectionShell::before,
.sectionShell::after {
  content: '';
  @apply absolute inset-y-0 w-56 rounded-full opacity-25 blur-3xl;
}

.sectionShell::before {
  @apply -left-10 bg-cyan-500/50;
}

.sectionShell::after {
  @apply -right-10 bg-purple-500/60;
}

.sectionHeader {
  @apply relative z-10 max-w-3xl space-y-3;
}

.eyebrow {
  @apply inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200;
}

.title {
  @apply font-bruno text-3xl text-white sm:text-4xl;
}

.lede {
  @apply font-bruno text-lg text-white/80;
}

.contentGrid {
  @apply relative z-10 mt-10 grid gap-6 lg:grid-cols-2;
}

.glassCard {
  @apply rounded-xl border border-white/10 bg-white/10 p-6 shadow-lg shadow-cyan-500/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20;
}

.cardHeading {
  @apply mb-4 flex items-center gap-3 text-white;
}

.beam {
  @apply inline-block h-10 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500;
}

.glassCard h2 {
  @apply font-bruno text-2xl text-white;
}

.field {
  @apply flex flex-col gap-2;
}

.field label {
  @apply font-bruno text-white;
}

.field input,
.field textarea {
  @apply rounded-lg border border-white/10 bg-white/10 px-3 py-3 font-bruno text-white placeholder-white/40 outline-none transition duration-200 focus:border-cyan-300 focus:bg-white/20;
}

.field input.error,
.field textarea.error {
  @apply border-red-500 bg-red-500/10;
}

.errorText {
  @apply text-sm text-red-400;
}

.cta {
  @apply w-full rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-3 font-bruno text-white shadow-lg shadow-purple-500/20 transition duration-300 hover:shadow-xl hover:-translate-y-0.5;
}

.infoPanel {
  @apply rounded-xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-white/0 p-6 shadow-lg shadow-cyan-500/10;
}

.infoText {
  @apply font-bruno text-white/80;
}

.chipRow {
  @apply mt-4 flex flex-wrap gap-2;
}

.chip {
  @apply rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white;
}

.socialGrid {
  @apply mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3;
}

.socialCard {
  @apply flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-3 font-bruno text-white transition duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-white/20;
}

.socialCard .icon {
  @apply h-6 w-6 text-cyan-200;
}

.toast {
  @apply fixed bottom-4 right-4 rounded-lg border border-green-400/40 bg-green-500/10 px-4 py-3 text-green-200 shadow-lg backdrop-blur transition-all duration-300;
}

.toastVisible {
  @apply opacity-100 translate-y-0;
}

.toastHidden {
  @apply opacity-0 translate-y-4;
}
</style>
