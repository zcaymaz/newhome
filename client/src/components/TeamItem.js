import { CardActionArea, Stack, Button } from "@mui/material"

const TeamItem = () => {
    const isAdmin = localStorage.getItem('role') === '1' ? true : false
    const adminRouter = () => {
        return (
            <Stack direction="row" spacing={3} bgcolor="white">
                <Button className='adminButtonPut'>Düzenle</Button>
                <Button className='adminButtonDelete'>Sil</Button>
            </Stack>
        )
    }
    return (
        <div className="col-lg-4">
            <CardActionArea href="/blog">
                <div className="team">
                    <div className="team-img">
                        <img src="/img/team.jpg" alt="team" />
                    </div>
                    <div className="team-info">
                        <h5 className="team-name">Proje Adı</h5>
                        <h6 className="team-position">Proje Açıklaması</h6>
                        <div className="social-links">
                            <div className="social-item"><i className="fab fa-facebook"></i></div>
                            <div className="social-item"><i className="fab fa-twitter"></i></div>
                            <div className="social-item"><i className="fab fa-instagram"></i></div>
                            <div className="social-item"><i className="fab fa-linkedin"></i></div>
                        </div>
                    </div>
                </div>
            </CardActionArea>
            {isAdmin ? adminRouter() : null}
        </div>
    )
}

export default TeamItem