export function generateWelcomeEmail(nombreDeEstudiante: string, email: string, password: string): string {
  return `
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0"
      style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <tr>
        <td style="background-color: #FEAB5F; color:rgb(0, 0, 0); text-align: center; padding: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
          <h1 style="margin: 0;">¡Bienvenido a NATIVOES!</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; color: #333333;">
          <p>Hola ${nombreDeEstudiante},</p>
          <p>Nos complace darte la bienvenida a NATIVOES. A continuación, encontrarás tus credenciales de acceso a nuestra plataforma:</p>
          <p style="font-size: 16px;">
            <strong>Email:</strong> <span style="color: #FEAB5F;">${email}</span><br>
            <strong>Contraseña:</strong> <span style="color:rgb(0, 0, 0);">${password}</span>
          </p>
          <p>Para iniciar sesión, haz clic en el siguiente enlace:</p>
          <p style="text-align: center;">
            <a href="https://plataforma.nativoes.com/" style="display: inline-block; background-color: #FEAB5F; color:rgb(0, 0, 0); padding: 10px 20px; text-decoration: none; border-radius: 5px;">Iniciar sesión</a>
          </p>
          <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
          <p>Saludos,<br> de parte de NATIVOES LLC</p>
        </td>
      </tr>
      <tr>
        <td style="background-color:rgb(0, 0, 0); text-align: center; padding: 10px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; color: #666666; font-size: 12px;">
          © 2025 Nativoes LLC. Todos los derechos reservados.
        </td>
      </tr>
    </table>
  </body>
  `;
}
