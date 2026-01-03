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
  @apply relative overflow-hidden rounded-2xl border px-6 py-10 sm:px-10;
  border-color: rgba(231, 223, 212, 0.12);
  background:
    repeating-linear-gradient(0deg, rgba(231, 223, 212, 0.03), rgba(231, 223, 212, 0.03) 1px, transparent 1px, transparent 26px),
    repeating-linear-gradient(90deg, rgba(231, 223, 212, 0.02), rgba(231, 223, 212, 0.02) 1px, transparent 1px, transparent 26px),
    linear-gradient(135deg, rgba(17, 16, 14, 0.94), rgba(10, 10, 9, 0.96));
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
}

.sectionShell::before,
.sectionShell::after {
  content: '';
  @apply absolute inset-y-0 w-56 rounded-full blur-3xl;
  opacity: 0.2;
}

.sectionShell::before {
  background: radial-gradient(circle, rgba(242, 159, 103, 0.45), transparent 65%);
  left: -2.5rem;
}

.sectionShell::after {
  background: radial-gradient(circle, rgba(126, 191, 159, 0.5), transparent 65%);
  right: -2.5rem;
}

.sectionHeader {
  @apply relative z-10 max-w-3xl space-y-3;
}

.eyebrow {
  @apply inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em];
  border-color: rgba(231, 223, 212, 0.2);
  color: #f29f67;
  background: rgba(231, 223, 212, 0.05);
}

.title {
  @apply font-bruno text-3xl sm:text-4xl;
  color: #e7dfd4;
}

.lede {
  @apply font-bruno text-lg;
  color: rgba(231, 223, 212, 0.78);
}

.contentGrid {
  @apply relative z-10 mt-10 grid gap-6 lg:grid-cols-2;
}

.glassCard {
  @apply rounded-xl border p-6 transition duration-300 hover:-translate-y-1;
  border-color: rgba(231, 223, 212, 0.12);
  background: rgba(19, 18, 16, 0.86);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.3);
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  position: relative;
  overflow: hidden;
}

.glassCard::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: linear-gradient(180deg, #f29f67, #7ebf9f);
  opacity: 0.9;
}

.cardHeading {
  @apply mb-4 flex items-center gap-3 text-white;
}

.beam {
  @apply inline-block h-10 w-1 rounded-full;
  background: linear-gradient(180deg, #f29f67, #7ebf9f);
}

.glassCard h2 {
  @apply font-bruno text-2xl;
  color: #e7dfd4;
}

.field {
  @apply flex flex-col gap-2;
}

.field label {
  @apply font-bruno;
  color: #e7dfd4;
}

.field input,
.field textarea {
  @apply rounded-lg border px-3 py-3 font-bruno outline-none transition duration-200;
  border-color: rgba(231, 223, 212, 0.12);
  background: rgba(231, 223, 212, 0.05);
  color: #e7dfd4;
  caret-color: #f29f67;
}

.field input:focus-visible,
.field textarea:focus-visible {
  border-color: rgba(242, 159, 103, 0.5);
  box-shadow: 0 0 0 2px rgba(242, 159, 103, 0.14);
}

.field input::placeholder,
.field textarea::placeholder {
  color: rgba(231, 223, 212, 0.35);
}

.field input.error,
.field textarea.error {
  @apply border-red-500 bg-red-500/10;
}

.errorText {
  @apply text-sm text-red-400;
}

.cta {
  @apply w-full rounded-lg px-4 py-3 font-bruno transition duration-300 hover:-translate-y-0.5;
  background: linear-gradient(120deg, #f29f67, #7ebf9f);
  color: #0c0a09;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.24);
  outline: none;
}

.cta:focus-visible {
  outline: 2px solid rgba(242, 159, 103, 0.55);
  outline-offset: 3px;
}

.infoPanel {
  @apply rounded-xl border p-6;
  border-color: rgba(231, 223, 212, 0.12);
  background: rgba(15, 14, 12, 0.9);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  position: relative;
  overflow: hidden;
}

.infoPanel::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: linear-gradient(180deg, #f29f67, #7ebf9f);
  opacity: 0.9;
}

.infoText {
  @apply font-bruno;
  color: rgba(231, 223, 212, 0.78);
}

.chipRow {
  @apply mt-4 flex flex-wrap gap-2;
}

.chip {
  @apply rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide;
  border-color: rgba(231, 223, 212, 0.22);
  background: rgba(231, 223, 212, 0.08);
  color: #e7dfd4;
}

.socialGrid {
  @apply mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3;
}

.socialCard {
  @apply flex items-center gap-2 rounded-lg border px-3 py-3 font-bruno transition duration-300 hover:-translate-y-1;
  border-color: rgba(231, 223, 212, 0.12);
  background: rgba(231, 223, 212, 0.05);
  color: #e7dfd4;
  outline: none;
}

.socialCard .icon {
  @apply h-6 w-6;
  color: #f29f67;
}

.socialCard:focus-visible {
  outline: 2px solid rgba(242, 159, 103, 0.5);
  outline-offset: 3px;
}

.toast {
  @apply fixed bottom-4 right-4 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300;
  border-color: rgba(126, 191, 159, 0.4);
  background: rgba(126, 191, 159, 0.12);
  color: #d0f1d6;
}

.toastVisible {
  @apply opacity-100 translate-y-0;
}

.toastHidden {
  @apply opacity-0 translate-y-4;
}
</style>
