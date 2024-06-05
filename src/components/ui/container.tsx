interface ContainerProps{
    children:React.ReactNode,
    className?:string
}

const Container:React.FC<ContainerProps> = ({children,className})=>{
    return (
        <div className={`${className} mx-auto w-full max-w-7xl`}>
            {children}
        </div>
    );
}

export default Container;