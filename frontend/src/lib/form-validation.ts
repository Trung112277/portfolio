export type ValidationSchema = {
  required?: string | boolean;
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (value: unknown) => boolean | string;
};

export const validationPatterns = {
  // Pattern cho author name
  authorName: {
    value: /^(?=.*[a-zA-Z])[0-9a-zA-Z\s,.=\-+]+$/,
    message:
      "Author name must contain only letters, digits, commas, hyphens, and equal signs",
  },
  email: {
    value: /^[^\s@]+[^#$%&'*+\-/=?^_`{|}~]+[\w-]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email format",
  },
  password: {
    value: /^[0-9a-zA-Z\s,.=\-+]+$/,
    message:
      "Password must contain only letters, digits, commas, hyphens, and equal signs",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    maxLength: {
      value: 50,
      message: "Password must be less than 50 characters",
    },
  },
  name: {
    value: /^[a-zA-Z0-9\s,.=\-+]{2,100}$/,
    message:
      "Name must contain only letters, digits, commas, hyphens, and equal signs",
  },

  // Pattern cho introduction -
  introduction: {
    value: /^[\s\S]{1,}$/,
    message:
      "Introduction must contain at least one character",
  },

  // Pattern cho URL
  url: {
    value: /^https?:\/\/.+/,
    message: "Please enter a valid URL starting with http:// or https://",
  },

  // Pattern cho color hex
  colorHex: {
    value: /^#[0-9A-Fa-f]{6}$/,
    message: "Please enter a valid hex color code (e.g., #FF0000)",
  },

  // Pattern cho description
  description: {
    value: /^[\p{Emoji}0-9a-zA-Z\s,.=\-+!?'"()\[\]{}:;]+$/u,
    message: "Description contains invalid characters",
  },

  companyName: {
    value: /^[a-zA-Z0-9\s&.,'-]+$/,
    message: "Company name contains invalid characters",
  },

  // Pattern cho position
  position: {
    value: /^[a-zA-Z0-9\s&.,'-]+$/,
    message: "Position contains invalid characters",
  },

  // Pattern cho year
  year: {
    value: /^(19|20)\d{2}$/,
    message: "Please enter a valid year between 1900 and 2099",
  },

  // Pattern cho work arrangement
  workArrangement: {
    value: /^(Full-time|Part-time|Contract|Freelance|Internship)$/,
    message: "Please select a valid work arrangement",
  },
  category: {
    value: /^(frontend|backend|database|devops)$/,
    message: "Please select a valid category",
  },

  // Pattern cho tech stack
  techStack: {
    value: /^[a-zA-Z0-9\s,]+$/,
    message: "Tech stack contains invalid characters",
  },
} as const;

export const validationRules = {
  authorName: {
    required: "Author name is required",
    pattern: validationPatterns.authorName,
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
    maxLength: {
      value: 100,
      message: "Name cannot exceed 100 characters",
    },
  },
  name: {
    required: "Name is required",
    pattern: validationPatterns.name,
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
    maxLength: {
      value: 100,
      message: "Name cannot exceed 100 characters",
    },
  },

  introduction: {
    required: "Introduction is required",
    pattern: validationPatterns.introduction,
    minLength: {
      value: 1,
      message: "Introduction must contain at least one character",
    },
    maxLength: {
      value: 2000,
      message: "Introduction must be less than 2000 characters",
    },
  },

  description: {
    required: "Description is required",
    pattern: validationPatterns.description,
    minLength: {
      value: 5,
      message: "Description must be at least 5 characters",
    },
    maxLength: {
      value: 200,
      message: "Description must be less than 200 characters",
    },
  },

  category: {
    required: "Category is required",
    pattern: validationPatterns.category,
  },

  link: {
    required: "Link is required",
    pattern: validationPatterns.url,
  },

  color: {
    required: "Color is required",
    pattern: validationPatterns.colorHex,
  },

  companyName: {
    required: "Company name is required",
    pattern: validationPatterns.companyName,
    minLength: {
      value: 2,
      message: "Company name must be at least 2 characters",
    },
    maxLength: {
      value: 100,
      message: "Company name must be less than 100 characters",
    },
  },

  position: {
    required: "Position is required",
    pattern: validationPatterns.position,
    minLength: {
      value: 2,
      message: "Position must be at least 2 characters",
    },
    maxLength: {
      value: 100,
      message: "Position must be less than 100 characters",
    },
  },

  year: {
    required: "Year is required",
    pattern: validationPatterns.year,
  },

  startYear: {
    required: "Start year is required",
    pattern: validationPatterns.year,
  },

  endYear: {
    required: "End year is required",
    pattern: validationPatterns.year,
  },

  workArrangement: {
    required: "Work arrangement is required",
    pattern: validationPatterns.workArrangement,
  },

  techStack: {
    required: "Tech stack is required",
    pattern: validationPatterns.techStack,
    minLength: {
      value: 2,
      message: "Tech stack must be at least 2 characters",
    },
    maxLength: {
      value: 200,
      message: "Tech stack must be less than 200 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: validationPatterns.email,
  },
  password: {
    required: "Password is required",
    pattern: validationPatterns.password,
    minLength: validationPatterns.password.minLength,
    maxLength: validationPatterns.password.maxLength,
  },

  rememberMe: {
    // Checkbox không cần validation phức tạp, chỉ cần boolean
  },

  image: {
    validate: (value: unknown) => {
      if (value instanceof File) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (value.size > maxSize) {
          return "Image size must be less than 10MB";
        }

        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedTypes.includes(value.type)) {
          return "Please upload a valid image file (JPEG, PNG, GIF, or WebP)";
        }
      }
      return true;
    },
  },
};

export const getFieldValidation = (
  fieldName: keyof typeof validationRules
): ValidationSchema => {
  return validationRules[fieldName] as ValidationSchema;
};
