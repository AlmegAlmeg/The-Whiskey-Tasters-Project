import './TableView.scss'

const TableView = ({ arr }) => {
    return (
        <div className="table-view">
            <table>
                <tbody>
                    {arr?.map((review, i) => {
                        return <tr key={i}>
                            <td className='table-img'><img src={review.imageUrl} alt='whiskey' /></td>
                            <td className='table-title'>{review.title}</td>
                            <td className='table-rating'>{review.rating} / 10</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableView