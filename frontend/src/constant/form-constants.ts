export const FORM_CONSTANTS = {
    VALIDATION: {
      DESCRIPTION: {
        MIN_LENGTH: 3,
        MIN_LENGTH_MESSAGE: "Description must be at least 3 characters",
        REQUIRED_MESSAGE: "Description is required",
      },
      LINK: {
        REQUIRED_MESSAGE: "Link is required",
        PATTERN: /^https?:\/\/.+/,
        PATTERN_MESSAGE: "Please enter a valid URL starting with http:// or https://",
      },
      COLOR: {
        REQUIRED_MESSAGE: "Color is required",
        PATTERN: /^#[0-9A-F]{6}$/i,
        PATTERN_MESSAGE: "Please enter a valid hex color code",
      },
      IMAGE: {
        REQUIRED_MESSAGE: "Please select an image",
      },
    },
    TIMING: {
      VALIDATION_DELAY: 100,
      API_SIMULATION_DELAY: 1000,
    },
    MESSAGES: {
      SUCCESS: {
        ADD: "Social media added successfully",
        UPDATE: "Social media updated successfully",
      },
      ERROR: {
        ADD: "Failed to add social media",
        UPDATE: "Failed to update social media",
      },
    },
  } as const;
  