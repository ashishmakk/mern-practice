import { Form, useNavigation, useOutletContext } from "react-router-dom";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const file = formData.get("avatar");

  if (file && file.size > 500000) {
    toast.error("file size too large");
    return null;
  }

  try {
    const updateUser = await customFetch.patch("/users/update-user", formData);
    toast.success("profile updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }

  return null;
};

function Profile() {
  const { user } = useOutletContext();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <section>
      <Form method='post' encType='multipart/form-data'>
        <h2>Update Profile</h2>
        <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='avatar'>
              Select an image file (max-size: 0.5MB)
            </label>
            <input
              type='file'
              name='avatar'
              id='avatar'
              accept='image/*'
              className='border-2 border-[#e4e4e4] outline-none p-2 rounded-md'
            />
          </div>
          <FormRow name='name' type='text' defaultValue={user.name} />
          <FormRow name='lastName' type='text' defaultValue={user.lastName} />
          <FormRow name='email' type='text' defaultValue={user.email} />
          <FormRow
            name='location'
            type='text'
            labelText='location'
            defaultValue={user.location}
          />
        </div>
        <button
          type='submit'
          className='form-btn w-40 mt-5'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </Form>
    </section>
  );
}

export default Profile;
