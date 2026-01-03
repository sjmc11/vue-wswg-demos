import { createField, type ValidatorFunction } from "vue-wswg-editor";
// import ImageField from "../../../page-builder/fields/image/image.vue";
// import * as yup from "yup";

/**
 * Editor fields configuration for HeroSection component
 */
export default {
   textAlign: createField.select(
      [
         { label: "Left", value: "left", id: "align-left" },
         { label: "Center", value: "center", id: "align-center" },
         { label: "Right", value: "right", id: "align-right" },
      ],
      {
         default: "center",
         label: "Text align",
         group: "content",
      }
   ),
   kicker: createField.text({
      maxLength: 50,
      description: "Optional kicker text above the heading",
      placeholder: "Enter a kicker...",
      group: "content",
      label: "Kicker",
   }),
   heading: createField.textarea({
      required: true,
      rows: 2,
      description: "Main heading text for the hero section",
      placeholder: "Enter your hero heading...",
      group: "content",
      label: "Heading",
      validator: (async (value: string): Promise<boolean | string> => {
         if (value.length < 10) {
            return "Heading must be at least 10 characters long";
         }
         if (value.length > 140) {
            return "Heading must be less than 140 characters long";
         }
         return true;
      }) satisfies ValidatorFunction,
   }),
   description: createField.textarea({
      rows: 4,
      description: "Optional description text below the heading",
      placeholder: "Enter a description...",
      group: "content",
      label: "Description",
   }),
   ctas: createField.repeater(
      {
         text: createField.text({
            label: "Button text",
            placeholder: "Find out more",
         }),
         url: createField.url({
            label: "URL",
            placeholder: "e.g., https://www.example.com",
         }),
         style: createField.select(
            [
               { label: "Solid", value: "solid", id: "style-solid" },
               { label: "Outline", value: "outline", id: "style-outline" },
            ],
            {
               default: "solid",
               label: "Style",
            }
         ),
      },
      {
         label: "CTAs",
         description: "Add call-to-action buttons",
         minItems: 1,
         maxItems: 3,
         group: "content",
         repeaterFieldLabel: "text",
         default: {
            text: "CTA button",
            link: "#",
            style: "solid",
         },
      }
   ),
   margin: createField.margin({ group: "appearance" }),
   image: createField.image({
      description: "Upload a hero image",
      group: "image",
      label: "Image",
   }),
   imagePosition: createField.select(
      [
         { label: "Left", value: "left", id: "image-left" },
         { label: "Right", value: "right", id: "image-right" },
      ],
      {
         default: "right",
         label: "Image position",
         group: "image",
      }
   ),
};
