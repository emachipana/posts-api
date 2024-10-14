export const profile = async (req, res) => {
  const { user } = req;

  try {
    res.json(user);
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
