import bcrypt from 'bcrypt'

export const hashedPassword = async(password)=>{
    try {
        const saltRound=10;
        const hash= await bcrypt.hash(password,
            saltRound
        )
        return hash;

    } catch (error) {
        console.log(error);
        
    }
}

export const comparePassword =async (password,hashedPassword) => {
    return bcrypt.compare(password,hashedPassword)
}