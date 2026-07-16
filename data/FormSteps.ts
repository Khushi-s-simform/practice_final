export interface FormField {
  key: string;
  label: string;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
  required: boolean;
  validation?: "email" | "phone" | "number";
}

export interface FormStep {
  title: string;
  fields: FormField[];
}

const formSteps: FormStep[] = [
  {
    title: "Personal Information",
    fields: [
      {
        key: "firstName",
        label: "First Name",
        placeholder: "Enter first name",
        required: true,
      },
      {
        key: "lastName",
        label: "Last Name",
        placeholder: "Enter last name",
        required: true,
      },
      {
        key: "email",
        label: "Email",
        placeholder: "Enter email",
        keyboardType: "email-address",
        required: true,
        validation: "email",
      },
      {
        key: "phone",
        label: "Phone Number",
        placeholder: "Enter phone number",
        keyboardType: "phone-pad",
        required: true,
        validation: "phone",
      },
    ],
  },

  {
    title: "Professional Information",
    fields: [
      {
        key: "company",
        label: "Company Name",
        placeholder: "Enter company name",
        required: true,
      },
      {
        key: "designation",
        label: "Designation",
        placeholder: "Enter designation",
        required: true,
      },
      {
        key: "experience",
        label: "Experience",
        placeholder: "Enter years of experience",
        keyboardType: "numeric",
        required: true,
        validation: "number",
      },
      {
        key: "salary",
        label: "Salary",
        placeholder: "Enter salary",
        keyboardType: "numeric",
        required: true,
      },
    ],
  },

  {
    title: "Address Information",
    fields: [
      {
        key: "country",
        label: "Country",
        placeholder: "Enter country",
        required: true,
      },
      {
        key: "state",
        label: "State",
        placeholder: "Enter state",
        required: true,
      },
      {
        key: "city",
        label: "City",
        placeholder: "Enter city",
        required: true,
      },
      {
        key: "pincode",
        label: "Pincode",
        placeholder: "Enter pincode",
        keyboardType: "numeric",
        required: true,
      },
    ],
  },

  {
    title: "Review & Submit",
    fields: [],
  },
];

export default formSteps;
