import { useEffect } from 'react';
import useStore from '../../store';
import { Button, Dropdown, Pagination } from 'flowbite-react';
import Comments from '../../components/Comments';
import { CRITERIAS, ORDERS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { clearCookies } from '../../utils/cookies';

export default function MainPage() {
    const { loadComments, count, criteria, order, page } = useStore();
    const navigate = useNavigate();

    const changeCriteria = async (new_crit) => {
        await loadComments(page, new_crit, order);
    };

    const changeOrder = async (new_order) => {
        await loadComments(page, criteria, new_order);
    };

    const changePage = async (new_page) => {
        await loadComments(new_page, criteria, order);
    };

    const logout = () => {
        clearCookies();
        navigate('/login');
    };

    const handlingLoad = async () => {
        try {
            await loadComments();
        } catch (e) {
            if (e.message === 'Invalid tokens') {
                navigate('/login')
            }
        }
    }

    useEffect(() => {
        handlingLoad();
    }, []);

    return <>
        <div className='grid grid-cols-5'>
            <div className='container mx-10 my-5'>
                <Dropdown label="Sort by...">
                    <Dropdown.Item onClick={() => changeCriteria(CRITERIAS.DATES)}>Date</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeCriteria(CRITERIAS.LOGINS)}>Login</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeCriteria(CRITERIAS.EMAILS)}>Email</Dropdown.Item>
                </Dropdown>
                <Dropdown label="Sort order...">
                    <Dropdown.Item onClick={() => changeOrder(ORDERS.ASC)}>Ascending</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeOrder(ORDERS.DESC)}>Descending</Dropdown.Item>
                </Dropdown>
            </div>
            <div className='container col-start-2 col-span-3 flex flex-wrap max-w-full'>
                <Comments />
            </div>
            <div>
                <Button className='bg-indigo-600 m-4' onClick={() => logout()}>Log out</Button>
            </div>
        </div>
        <div className='container ml-96'>
            {count > 25 && <Pagination className='my-5' currentPage={page} totalPages={Math.ceil(count / 25)} onPageChange={changePage}/>}
        </div>
    </>
}