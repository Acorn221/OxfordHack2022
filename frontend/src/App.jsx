import Picture from './Picture';

const App = () => {
  return (
    <div className="w-full h-screen bg-slate-900">
      <div className="w-full h-16 border-b-2 border-slate-200 flex justify-between items-center">
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-md text-white">Home</p>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-md text-white">Something</p>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-md text-white">Profile</p>
        </div>
      </div>
      <div className="w-full p-2 grid grid-cols-2 gap-2">
        <Picture />
        <Picture />
        <Picture />
        <Picture />
        <Picture />
        <Picture />
        <Picture />
      </div>
    </div>
  );
};

export default App;
