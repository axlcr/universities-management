import React from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../services/api';

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  location: z.string().nonempty('Location is required'),
  website: z.string().url('Invalid website URL'),
  contact_emails: z
    .array(z.object({ email: z.string().email('Invalid email') }))
    .min(1, 'At least one email is required'),
});

type FormData = z.infer<typeof schema>;

const AddUniversityForm = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      location: '',
      website: '',
      contact_emails: [{ email: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contact_emails',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form data:', data);
    const transformedData = {
      ...data,
      contact_emails: data.contact_emails.map((item) => item.email),
    };
    api.post('/universities', transformedData)
    .then(() => alert('University added successfully!'))
    .catch((error) => {
      console.error('Error adding university:', error);
      alert('Failed to add university. Please try again.');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Name</label>
        <input
          {...register('name')}
          className="border p-2 w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label>Location</label>
        <input
          {...register('location')}
          className="border p-2 w-full"
        />
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
      </div>

      <div>
        <label>Website</label>
        <input
          {...register('website')}
          className="border p-2 w-full"
        />
        {errors.website && <p className="text-red-500">{errors.website.message}</p>}
      </div>
      <div>
        <label>Contact Emails</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center">
            <input
              {...register(`contact_emails.${index}.email` as const)}
              className="border p-2 w-full"
              defaultValue={field.email}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ email: '' })}
          className="text-blue-500"
        >
          Add Email
        </button>
        {errors.contact_emails && <p className="text-red-500">{errors.contact_emails.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add University
      </button>
    </form>
  );
};

export default AddUniversityForm;
