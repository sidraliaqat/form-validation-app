# React Registration Form with Validation

A modern, responsive registration form built with React featuring complete client-side validation, password visibility toggle, and a beautiful glassmorphism UI design.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=flat&logo=css3)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

### 🎯 Core Features
- ✅ **Client-side validation** for all form fields
- ✅ **Real-time error feedback** with inline error messages
- ✅ **Password visibility toggle** with SVG eye icons
- ✅ **Submit button disabled** until all fields are valid
- ✅ **Requirements checklist** with real-time updates

### 🎨 UI/UX Features
- ✨ **Glassmorphism design** with backdrop blur effects
- 🌈 **Beautiful gradient backgrounds** with brand colors
- 📱 **Fully responsive** for all screen sizes
- 🎭 **Smooth animations** and hover effects
- ♿ **Accessibility ready** with ARIA attributes

### 🛡️ Security Features
- 🔒 Password masking with show/hide toggle
- ✅ Form validation before submission
- 🚫 Prevent form submission when invalid

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks (useState, useMemo) |
| **CSS3** | Custom styling with glassmorphism |
| **Git & GitHub** | Version control and repository hosting |

## 📋 Validation Rules

| Field | Validation Rules |
|-------|------------------|
| **Name** | • Required<br>• Minimum 2 characters<br>• Must start with a letter |
| **Email** | • Required<br>• Must be a valid email format<br>• Ends with @gmail.com |
| **Password** | • Required<br>• Minimum 8 characters<br>• At least 1 number<br>• At least 1 special character |
| **Confirm Password** | • Required<br>• Must match the password field |

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Steps to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/sidraliaqat/form-validation-app.git

# 2. Navigate to project directory
cd form-validation-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm start

# 5. Open your browser and visit
# http://localhost:3000
