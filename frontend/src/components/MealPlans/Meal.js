

export const Meal = ({name, cal}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
            <div>
                {name}
            </div>
            <div>
                {`Calories: ${cal}`}
            </div>
        </div>
    )
}