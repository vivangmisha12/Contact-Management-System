import { logoutAction } from "../actions/auth";

const LogoutButton = () => {
    return (
        <form action={logoutAction}>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer" type="submit">
                Log out
            </button>
        </form>
    );
};

export default LogoutButton;