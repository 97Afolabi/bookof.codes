export default function Bio() {
  return (
    <div className='flex mb-14 items-center  py-4 '>
      <img
        src='/avatar.jpg'
        alt='profile image'
        className='rounded-full h-14 w-14 mr-3.5'
      />
      <p className='text-sm font-body leading-5 dark:text-mgrey'>
        Hey 👋🏼, Welcome to my personal code blog. <br />
        Here i write about things i learn and work with everyday.
      </p>
    </div>
  );
}
