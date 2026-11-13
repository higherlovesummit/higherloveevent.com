// redeploy 2026-10-07 07:34 (bind CFP_PASSWORD)
// Higher Love — server-side password gate (Cloudflare Workers + Static Assets)
// Gate is active only when CFP_PASSWORD is set (fail-open: site stays public until you set it).
const LOGO = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iRnVsbC1Db2xvciIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNDIzLjM1IDYzLjM0Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiAjZmZmOwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik04LjA4LDE0LjI3Yy0uMjgtLjY0LS44MS0xLjA5LTEuNTktMS4zNS0uNzgtLjI1LTIuMDItLjM4LTMuNzMtLjM4LS4xNCwwLS4yMS0uMTQtLjIxLS40MXMuMDctLjQxLjIxLS40MWwzLjUyLjA3YzEuOTMuMDksMy41NC4xNCw0LjgzLjE0LDEuNDMsMCwzLjItLjA0LDUuMzEtLjE0bDMuNTItLjA3Yy4wOSwwLC4xNC4xNC4xNC40MXMtLjA1LjQxLS4xNC40MWMtMS43NSwwLTMuMDQuMTQtMy44Ni40MS0uODMuMjgtMS4zOS43NS0xLjY5LDEuNDEtLjMuNjctLjQ1LDEuNjktLjQ1LDMuMDd2MzEuODFjMCwxLjM4LjE1LDIuNC40NSwzLjA3LjMuNjcuODUsMS4xMiwxLjY2LDEuMzUuOC4yMywyLjEuMzQsMy45LjM0LjA5LDAsLjE0LjE0LjE0LjQxcy0uMDUuNDEtLjE0LjQxYy0xLjUyLDAtMi42OS0uMDItMy41Mi0uMDdsLTUuMzEtLjA3LTQuOS4wN2MtLjg3LjA1LTIuMDcuMDctMy41OS4wNy0uMDksMC0uMTQtLjE0LS4xNC0uNDFzLjA0LS40MS4xNC0uNDFjMS43LDAsMi45Ni0uMTEsMy43Ni0uMzQuOC0uMjMsMS4zNi0uNjgsMS42Ni0xLjM1LjMtLjY3LjQ1LTEuNjkuNDUtMy4wN3YtMzEuOTVjMC0xLjM4LS4xNC0yLjM5LS40MS0zLjA0Wk0xMS4wNCwzMS41OWgzMC41djEuNTlIMTEuMDR2LTEuNTlaTTM4LjcxLDE0LjM3Yy0uMjgtLjY3LS44My0xLjE0LTEuNjYtMS40MS0uODMtLjI4LTIuMTItLjQxLTMuODYtLjQxLS4xNCwwLS4yMS0uMTQtLjIxLS40MXMuMDctLjQxLjIxLS40MWwzLjI0LjA3YzIuMTIuMDksMy45My4xNCw1LjQ1LjE0LDEuMjksMCwyLjk0LS4wNCw0Ljk3LS4xNGwzLjUyLS4wN2MuMTQsMCwuMjEuMTQuMjEuNDFzLS4wNy40MS0uMjEuNDFjLTEuNywwLTIuOTYuMTMtMy43Ni4zOC0uODEuMjUtMS4zNS43LTEuNjIsMS4zNS0uMjguNjQtLjQxLDEuNjYtLjQxLDMuMDR2MzEuOTVjMCwxLjM4LjE0LDIuNC40MSwzLjA3LjI4LjY3LjgyLDEuMTIsMS42MiwxLjM1LjguMjMsMi4wNi4zNCwzLjc2LjM0LjE0LDAsLjIxLjE0LjIxLjQxcy0uMDcuNDEtLjIxLjQxYy0xLjQ3LDAtMi42NS0uMDItMy41Mi0uMDdsLTQuOTctLjA3LTUuNDUuMDdjLS43OC4wNS0xLjg2LjA3LTMuMjQuMDctLjE0LDAtLjIxLS4xNC0uMjEtLjQxcy4wNy0uNDEuMjEtLjQxYzEuNzksMCwzLjA5LS4xMSwzLjktLjM0LjgtLjIzLDEuMzUtLjY3LDEuNjItMS4zMS4yOC0uNjQuNDEtMS42OC40MS0zLjF2LTMxLjgxYzAtMS4zOC0uMTQtMi40LS40MS0zLjA3WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTY1LjUsNTIuMzVjLjI1LjY1Ljc2LDEuMDgsMS41MiwxLjMxLjc2LjIzLDEuOTkuMzQsMy42OS4zNC4wOSwwLC4xNC4xNC4xNC40MXMtLjA1LjQxLS4xNC40MWMtMS40NywwLTIuNjItLjAyLTMuNDUtLjA3bC00Ljk3LS4wNy00LjgzLjA3Yy0uODcuMDUtMi4wNy4wNy0zLjU5LjA3LS4wOSwwLS4xNC0uMTQtLjE0LS40MXMuMDUtLjQxLjE0LS40MWMxLjY2LDAsMi44Ny0uMTEsMy42Ni0uMzQuNzgtLjIzLDEuMzItLjY4LDEuNjItMS4zNS4zLS42Ny40NS0xLjY5LjQ1LTMuMDd2LTMxLjk1YzAtMS4zOC0uMTUtMi4zOS0uNDUtMy4wNC0uMy0uNjQtLjg0LTEuMDktMS42Mi0xLjM1LS43OC0uMjUtMi0uMzgtMy42Ni0uMzgtLjA5LDAtLjE0LS4xNC0uMTQtLjQxcy4wNS0uNDEuMTQtLjQxbDMuNTkuMDdjMi4wMi4wOSwzLjYzLjE0LDQuODMuMTQsMS4zMywwLDMuMDEtLjA0LDUuMDQtLjE0bDMuMzgtLjA3Yy4wOSwwLC4xNC4xNC4xNC40MXMtLjA1LjQxLS4xNC40MWMtMS42NiwwLTIuODYuMTQtMy42Mi40MS0uNzYuMjgtMS4yOC43NS0xLjU1LDEuNDEtLjI4LjY3LS40MSwxLjY5LS40MSwzLjA3djMxLjgxYzAsMS40My4xMywyLjQ2LjM4LDMuMVoiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik04NC41Miw1Mi42NmMtMy43OS0yLTYuNjktNC43MS04LjY5LTguMTQtMi0zLjQzLTMtNy4yMS0zLTExLjM1LDAtNC40MiwxLjE0LTguMywzLjQyLTExLjY2LDIuMjgtMy4zNiw1LjQtNS45Niw5LjM4LTcuOCwzLjk4LTEuODQsOC40NS0yLjc2LDEzLjQyLTIuNzYsMi4zNSwwLDQuNi4yMiw2Ljc2LjY2LDIuMTYuNDQsMy45NiwxLjAyLDUuMzgsMS43Ni4zNy4xOC41OS4zNC42Ni40OHMuMTMuNTEuMTcsMS4xbC45LDguNTZjMCwuMTQtLjEzLjIzLS4zOC4yOC0uMjUuMDUtLjQtLjAyLS40NS0uMjEtLjk3LTMuMjItMi42OC01LjkyLTUuMTQtOC4xMS0yLjQ2LTIuMTgtNS42Ny0zLjI4LTkuNjMtMy4yOC0zLjQ1LDAtNi41Ni44LTkuMzEsMi40Mi0yLjc2LDEuNjEtNC45MywzLjkyLTYuNTIsNi45My0xLjU5LDMuMDEtMi4zOCw2LjUyLTIuMzgsMTAuNTJzLjgsNy43OSwyLjQyLDExLjIxYzEuNjEsMy40MywzLjk3LDYuMTgsNy4wNyw4LjI1LDMuMSwyLjA3LDYuOCwzLjEsMTEuMDcsMy4xLDMuMTMsMCw1LjMxLS42MSw2LjU1LTEuODMsMS4yNC0xLjIyLDEuODYtMy40MiwxLjg2LTYuNTksMC0yLjM5LS4xNS00LjA2LS40NS01LS4zLS45NC0uOTQtMS41OC0xLjkzLTEuOS0uOTktLjMyLTIuNzMtLjQ4LTUuMjEtLjQ4LS4yOCwwLS40MS0uMTgtLjQxLS41NSwwLS4xNC4wMy0uMjYuMS0uMzguMDctLjExLjE1LS4xNy4yNC0uMTcsMy42OC4yMyw2LjY3LjM1LDguOTcuMzVzNC41OC0uMDcsNi45Ny0uMjFjLjA5LDAsLjE3LjA2LjI0LjE3LjA3LjEyLjEuMjIuMS4zMSwwLC4zMi0uMTIuNDgtLjM1LjQ4LTEuMDYtLjA1LTEuNzkuMS0yLjIxLjQ1cy0uNjgsMS4wNS0uNzksMi4xYy0uMTIsMS4wNi0uMTcsMi45LS4xNyw1LjUyLDAsMi4wNy4wOCwzLjU0LjI0LDQuNDIuMTYuODcuMjQsMS40My4yNCwxLjY2LDAsLjI4LS4wNS40Ni0uMTQuNTUtLjA5LjA5LS4zLjE4LS42Mi4yOC01LjgsMS4yNC0xMC44MSwxLjg2LTE1LjA0LDEuODYtNS4xMSwwLTkuNTYtMS0xMy4zNS0zWiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEyMy40NSwxNC4yN2MtLjI4LS42NC0uODEtMS4wOS0xLjU5LTEuMzUtLjc4LS4yNS0yLjAyLS4zOC0zLjczLS4zOC0uMTQsMC0uMjEtLjE0LS4yMS0uNDFzLjA3LS40MS4yMS0uNDFsMy41Mi4wN2MxLjkzLjA5LDMuNTQuMTQsNC44My4xNCwxLjQzLDAsMy4yLS4wNCw1LjMxLS4xNGwzLjUyLS4wN2MuMDksMCwuMTQuMTQuMTQuNDFzLS4wNS40MS0uMTQuNDFjLTEuNzUsMC0zLjA0LjE0LTMuODYuNDEtLjgzLjI4LTEuMzkuNzUtMS42OSwxLjQxLS4zLjY3LS40NSwxLjY5LS40NSwzLjA3djMxLjgxYzAsMS4zOC4xNSwyLjQuNDUsMy4wNy4zLjY3Ljg1LDEuMTIsMS42NiwxLjM1LjguMjMsMi4xLjM0LDMuOS4zNC4wOSwwLC4xNC4xNC4xNC40MXMtLjA1LjQxLS4xNC40MWMtMS41MiwwLTIuNjktLjAyLTMuNTItLjA3bC01LjMxLS4wNy00LjkuMDdjLS44Ny4wNS0yLjA3LjA3LTMuNTkuMDctLjA5LDAtLjE0LS4xNC0uMTQtLjQxcy4wNC0uNDEuMTQtLjQxYzEuNywwLDIuOTYtLjExLDMuNzYtLjM0LjgtLjIzLDEuMzYtLjY4LDEuNjYtMS4zNS4zLS42Ny40NS0xLjY5LjQ1LTMuMDd2LTMxLjk1YzAtMS4zOC0uMTQtMi4zOS0uNDEtMy4wNFpNMTI2LjQyLDMxLjU5aDMwLjV2MS41OWgtMzAuNXYtMS41OVpNMTU0LjA5LDE0LjM3Yy0uMjgtLjY3LS44My0xLjE0LTEuNjYtMS40MS0uODMtLjI4LTIuMTItLjQxLTMuODYtLjQxLS4xNCwwLS4yMS0uMTQtLjIxLS40MXMuMDctLjQxLjIxLS40MWwzLjI0LjA3YzIuMTIuMDksMy45My4xNCw1LjQ1LjE0LDEuMjksMCwyLjk0LS4wNCw0Ljk3LS4xNGwzLjUyLS4wN2MuMTQsMCwuMjEuMTQuMjEuNDFzLS4wNy40MS0uMjEuNDFjLTEuNywwLTIuOTYuMTMtMy43Ni4zOC0uODEuMjUtMS4zNS43LTEuNjIsMS4zNS0uMjguNjQtLjQxLDEuNjYtLjQxLDMuMDR2MzEuOTVjMCwxLjM4LjE0LDIuNC40MSwzLjA3LjI4LjY3LjgyLDEuMTIsMS42MiwxLjM1LjguMjMsMi4wNi4zNCwzLjc2LjM0LjE0LDAsLjIxLjE0LjIxLjQxcy0uMDcuNDEtLjIxLjQxYy0xLjQ3LDAtMi42NS0uMDItMy41Mi0uMDdsLTQuOTctLjA3LTUuNDUuMDdjLS43OC4wNS0xLjg2LjA3LTMuMjQuMDctLjE0LDAtLjIxLS4xNC0uMjEtLjQxcy4wNy0uNDEuMjEtLjQxYzEuNzksMCwzLjA5LS4xMSwzLjktLjM0LjgtLjIzLDEuMzUtLjY3LDEuNjItMS4zMS4yOC0uNjQuNDEtMS42OC40MS0zLjF2LTMxLjgxYzAtMS4zOC0uMTQtMi40LS40MS0zLjA3WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE2OS4wMiw1NC40MmMwLS4yOC4wNy0uNDEuMjEtLjQxLDEuNjYsMCwyLjg2LS4xMSwzLjYyLS4zNC43Ni0uMjMsMS4yOC0uNjgsMS41NS0xLjM1LjI4LS42Ny40MS0xLjY5LjQxLTMuMDd2LTMxLjk1YzAtMS4zOC0uMTQtMi4zOS0uNDEtMy4wNC0uMjgtLjY0LS43OS0xLjA5LTEuNTUtMS4zNS0uNzYtLjI1LTEuOTctLjM4LTMuNjItLjM4LS4xNCwwLS4yMS0uMTQtLjIxLS40MXMuMDctLjQxLjIxLS40MWgyOC4xNWMuNDYsMCwuNjkuMjEuNjkuNjJsLjE0LDguNjljMCwuMTQtLjEzLjIyLS4zOC4yNC0uMjUuMDItLjQtLjAzLS40NS0uMTctLjMyLTIuNTMtMS4yMi00LjQ2LTIuNjktNS44LTEuNDctMS4zMy0zLjQtMi01Ljc5LTJoLTMuNTJjLTIuMDMsMC0zLjM4LjMtNC4wNy45cy0xLjA0LDEuNzItMS4wNCwzLjM4djMxLjM5YzAsMS42Ni4zMSwyLjc4LjkzLDMuMzguNjIuNiwxLjg3LjksMy43Ni45aDQuNTVjMi41OCwwLDQuNzMtLjc3LDYuNDUtMi4zMSwxLjcyLTEuNTQsMi45MS0zLjc0LDMuNTUtNi41OSwwLS4wOS4wOS0uMTQuMjgtLjE0LjE0LDAsLjI2LjAzLjM4LjEuMTEuMDcuMTcuMTMuMTcuMTctLjQ2LDMuMzEtLjY5LDYuNDItLjY5LDkuMzEsMCwuMzctLjA3LjYzLS4yMS43OXMtLjQxLjI0LS44My4yNGgtMjkuMzljLS4xNCwwLS4yMS0uMTQtLjIxLS40MVpNMTkzLjA2LDM0LjU5Yy0xLjEzLS45NC0yLjkxLTEuNDEtNS4zNS0xLjQxaC0xMC4wN3YtMS41OWgxMC4yMWMyLjM1LDAsNC4wNy0uNCw1LjE4LTEuMjEsMS4xLS44LDEuNjUtMi4wNiwxLjY1LTMuNzYsMC0uMDkuMTMtLjE0LjM4LS4xNHMuMzguMDUuMzguMTRsLS4wNyw1LjguMDcsMy4xYy4wOSwxLjQ3LjE0LDIuNjIuMTQsMy40NSwwLC4wOS0uMTQuMTQtLjQxLjE0cy0uNDEtLjA0LS40MS0uMTRjMC0xLjk4LS41Ni0zLjQ0LTEuNjktNC4zOFoiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yMzAuNjgsMTMuOTJjMi4wNywxLjYxLDMuMSwzLjc5LDMuMSw2LjU1LDAsMi40OC0uNzIsNC43NS0yLjE3LDYuOC0xLjQ1LDIuMDUtMy4zNywzLjY2LTUuNzYsNC44My0yLjM5LDEuMTctNC45NSwxLjc2LTcuNjYsMS43Ni0uOTcsMC0yLjA5LS4wNS0zLjM4LS4xNHYxNS41M2MwLDEuMzguMTQsMi40LjQxLDMuMDcuMjguNjcuNzksMS4xMiwxLjU1LDEuMzUuNzYuMjMsMS45Ny4zNCwzLjYyLjM0LjE0LDAsLjIxLjE0LjIxLjQxcy0uMDcuNDEtLjIxLjQxYy0xLjQzLDAtMi41NS0uMDItMy4zOC0uMDdsLTQuOTctLjA3LTQuODMuMDdjLS44OC4wNS0yLjA1LjA3LTMuNTIuMDctLjE0LDAtLjIxLS4xNC0uMjEtLjQxcy4wNy0uNDEuMjEtLjQxYzEuNjYsMCwyLjg3LS4xMSwzLjY2LS4zNC43OC0uMjMsMS4zMS0uNjgsMS41OS0xLjM1LjI4LS42Ny40MS0xLjY5LjQxLTMuMDd2LTMxLjk1YzAtMS4zOC0uMTQtMi4zOS0uNDEtMy4wNC0uMjgtLjY0LS43OS0xLjA5LTEuNTUtMS4zNS0uNzYtLjI1LTEuOTctLjM4LTMuNjItLjM4LS4wOSwwLS4xNC0uMTQtLjE0LS40MXMuMDQtLjQxLjE0LS40MWwzLjQ1LjA3YzIuMDIuMDksMy42My4xNCw0LjgzLjE0Ljk3LDAsMS44OC0uMDIsMi43Ni0uMDcuODctLjA0LDEuNjMtLjA5LDIuMjgtLjE0LDEuNzUtLjE0LDMuMzMtLjIxLDQuNzYtLjIxLDMuODIsMCw2Ljc2LjgxLDguODMsMi40MlpNMjI1Ljk5LDE0LjkyYy0xLjQzLTEuNS0zLjUyLTIuMjQtNi4yOC0yLjI0LTEuNzksMC0zLjA2LjMzLTMuNzksMS0uNzQuNjctMS4xLDEuOTItMS4xLDMuNzZ2MTQuNTZjMS4zMy4xNCwyLjY5LjIxLDQuMDcuMjEsMy4zMSwwLDUuNjgtLjc3LDcuMTEtMi4zMSwxLjQzLTEuNTQsMi4xNC0zLjk0LDIuMTQtNy4yMSwwLTMuNjgtLjcxLTYuMjctMi4xNC03Ljc2Wk0yMzIuMSw0OS4wNGMtMy4xLTMuODYtNi44Ny05LjI3LTExLjI4LTE2LjIxbDQuNjItMS40NWMzLjkxLDUuNzUsNy4yLDEwLjI0LDkuODcsMTMuNDYsMi42NywzLjIyLDUuMDIsNS41NSw3LjA3LDcsMi4wNSwxLjQ1LDQuMDQsMi4xNyw1Ljk3LDIuMTcuMTQsMCwuMjEuMTQuMjEuNDFzLS4wNy40MS0uMjEuNDFoLTkuODdjLTEuMTUsMC0zLjI4LTEuOTMtNi4zOC01LjhaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjc0LjE5LDUxLjc3Yy4yNS41OC43Mi45NywxLjQxLDEuMTcuNjkuMjEsMS43Ny4zMSwzLjI0LjMxaDUuODdjMi45LDAsNS4zLS44Niw3LjIxLTIuNTksMS45MS0xLjcyLDMuMTktNC4wNiwzLjgzLTcsMC0uMTQuMTMtLjIuMzgtLjE3LjI1LjAyLjM4LjEuMzguMjQtLjQxLDQuMDUtLjYyLDcuNDEtLjYyLDEwLjA3LDAsLjM3LS4wOC42My0uMjQuNzktLjE2LjE2LS40My4yNC0uNzkuMjRoLTMyLjE1Yy0uMDksMC0uMTQtLjE0LS4xNC0uNDFzLjA1LS40MS4xNC0uNDFjMS42NiwwLDIuODctLjExLDMuNjYtLjM0Ljc4LS4yMywxLjMxLS42OCwxLjU5LTEuMzUuMjgtLjY3LjQxLTEuNjkuNDEtMy4wN3YtMzEuOTVjMC0xLjM4LS4xNC0yLjM5LS40MS0zLjA0LS4yOC0uNjQtLjgxLTEuMDktMS41OS0xLjM1LS43OC0uMjUtMi0uMzgtMy42Ni0uMzgtLjA5LDAtLjE0LS4xNC0uMTQtLjQxcy4wNS0uNDEuMTQtLjQxbDMuNDUuMDdjMi4wMi4wOSwzLjY2LjE0LDQuOS4xNHMyLjg3LS4wNCw0LjktLjE0bDMuNDUtLjA3Yy4wOSwwLC4xNC4xNC4xNC40MXMtLjA1LjQxLS4xNC40MWMtMS42NiwwLTIuODYuMTMtMy42Mi4zOC0uNzYuMjUtMS4yOC43MS0xLjU1LDEuMzgtLjI4LjY3LS40MSwxLjY5LS40MSwzLjA3djMxLjZjMCwxLjI5LjEzLDIuMjIuMzgsMi43OVoiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zMDguNzMsNTIuNjZjLTMuMzQtMi01LjkxLTQuNzEtNy43My04LjE0LTEuODItMy40My0yLjczLTcuMTYtMi43My0xMS4yMSwwLTQuNzQsMS4yLTguOCwzLjU5LTEyLjE4LDIuMzktMy4zOCw1LjQ2LTUuOTIsOS4yMS03LjYyLDMuNzUtMS43LDcuNTgtMi41NSwxMS40OS0yLjU1LDQuMzcsMCw4LjIxLDEuMDIsMTEuNTIsMy4wNywzLjMxLDIuMDUsNS44NSw0Ljc1LDcuNjIsOC4xMSwxLjc3LDMuMzYsMi42Niw2LjkyLDIuNjYsMTAuNywwLDQuMTktMS4xLDguMDMtMy4zMSwxMS41Mi0yLjIxLDMuNS01LjE2LDYuMjYtOC44Nyw4LjI4LTMuNywyLjAyLTcuNzIsMy4wNC0xMi4wNCwzLjA0cy04LjA4LTEtMTEuNDItM1pNMzMwLjQ5LDUxLjg3YzIuMzUtMS41Miw0LjItMy43NCw1LjU1LTYuNjYsMS4zNi0yLjkyLDIuMDQtNi40LDIuMDQtMTAuNDUsMC00LjI4LS43NS04LjEtMi4yNC0xMS40NS0xLjUtMy4zNi0zLjYzLTUuOTgtNi40Mi03Ljg3LTIuNzgtMS44OC02LjAxLTIuODMtOS42OS0yLjgzLTQuNzgsMC04LjUxLDEuNjItMTEuMTgsNC44Ni0yLjY3LDMuMjQtNCw3LjcyLTQsMTMuNDIsMCw0LjM3Ljc2LDguMzMsMi4yOCwxMS44NywxLjUyLDMuNTQsMy42NSw2LjMzLDYuMzgsOC4zNSwyLjc0LDIuMDIsNS44NSwzLjA0LDkuMzUsMy4wNCwyLjk0LDAsNS41OS0uNzYsNy45My0yLjI4WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTM4Ny43NywxMi4xM2MwLC4yOC0uMDcuNDEtLjIxLjQxLTMuMzEsMC01LjgsMi4wOS03LjQ1LDYuMjhsLTE0LjA4LDM1Ljk1Yy0uMDUuMTgtLjMuMjgtLjc2LjI4cy0uNzEtLjA5LS43Ni0uMjhsLTE3LjMyLTM3LjMzYy0uODMtMS43NS0xLjY3LTMtMi41Mi0zLjc2LS44NS0uNzYtMS45LTEuMTQtMy4xNC0xLjE0LS4xNCwwLS4yMS0uMTQtLjIxLS40MXMuMDctLjQxLjIxLS40MWwyLjE0LjA3YzEuMi4wOSwyLjMyLjE0LDMuMzguMTQsMi40OCwwLDQuODgtLjA0LDcuMTgtLjE0Ljc0LS4wNSwxLjY4LS4wNywyLjgzLS4wNy4xNCwwLC4yMS4xNC4yMS40MXMtLjA3LjQxLS4yMS40MWMtMi44NSwwLTQuMjguODctNC4yOCwyLjYyLDAsLjc0LjIzLDEuNTYuNjksMi40OGwxNC4xNSwzMC43Ny0yLjQ4LDQsMTMuMzItMzMuOTVjLjM3LTEuMDEuNTUtMS44Ni41NS0yLjU1LDAtMi4yNS0xLjc1LTMuMzgtNS4yNC0zLjM4LS4xNCwwLS4yMS0uMTQtLjIxLS40MXMuMDctLjQxLjIxLS40MWwzLjExLjA3YzEuNzUuMDksMy4yNy4xNCw0LjU1LjE0Ljk3LDAsMi4wNS0uMDQsMy4yNC0uMTRsMi45LS4wN2MuMTQsMCwuMjEuMTQuMjEuNDFaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMzg5LjU0LDU0LjQyYzAtLjI4LjA3LS40MS4yMS0uNDEsMS42NiwwLDIuODYtLjExLDMuNjItLjM0Ljc2LS4yMywxLjI4LS42OCwxLjU1LTEuMzUuMjgtLjY3LjQxLTEuNjkuNDEtMy4wN3YtMzEuOTVjMC0xLjM4LS4xNC0yLjM5LS40MS0zLjA0LS4yOC0uNjQtLjc5LTEuMDktMS41NS0xLjM1LS43Ni0uMjUtMS45Ny0uMzgtMy42Mi0uMzgtLjE0LDAtLjIxLS4xNC0uMjEtLjQxcy4wNy0uNDEuMjEtLjQxaDI4LjE1Yy40NiwwLC42OS4yMS42OS42MmwuMTQsOC42OWMwLC4xNC0uMTMuMjItLjM4LjI0LS4yNS4wMi0uNC0uMDMtLjQ1LS4xNy0uMzItMi41My0xLjIyLTQuNDYtMi42OS01LjgtMS40Ny0xLjMzLTMuNC0yLTUuOC0yaC0zLjUyYy0yLjAzLDAtMy4zOC4zLTQuMDcuOXMtMS4wNCwxLjcyLTEuMDQsMy4zOHYzMS4zOWMwLDEuNjYuMzEsMi43OC45MywzLjM4LjYyLjYsMS44Ny45LDMuNzYuOWg0LjU1YzIuNTgsMCw0LjczLS43Nyw2LjQ1LTIuMzEsMS43My0xLjU0LDIuOTEtMy43NCwzLjU1LTYuNTksMC0uMDkuMDktLjE0LjI4LS4xNC4xNCwwLC4yNi4wMy4zOC4xLjExLjA3LjE3LjEzLjE3LjE3LS40NiwzLjMxLS42OSw2LjQyLS42OSw5LjMxLDAsLjM3LS4wNy42My0uMjEuNzktLjE0LjE2LS40MS4yNC0uODMuMjRoLTI5LjM5Yy0uMTQsMC0uMjEtLjE0LS4yMS0uNDFaTTQxMy41OCwzNC41OWMtMS4xMy0uOTQtMi45MS0xLjQxLTUuMzUtMS40MWgtMTAuMDd2LTEuNTloMTAuMjFjMi4zNSwwLDQuMDctLjQsNS4xOC0xLjIxLDEuMS0uOCwxLjY2LTIuMDYsMS42Ni0zLjc2LDAtLjA5LjEzLS4xNC4zOC0uMTRzLjM4LjA1LjM4LjE0bC0uMDcsNS44LjA3LDMuMWMuMDksMS40Ny4xNCwyLjYyLjE0LDMuNDUsMCwuMDktLjE0LjE0LS40MS4xNHMtLjQxLS4wNC0uNDEtLjE0YzAtMS45OC0uNTYtMy40NC0xLjY5LTQuMzhaIi8+Cjwvc3ZnPg==";
const LOGO_STACKED = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iRnVsbC1Db2xvciIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjUwLjg5IDEwMy43NyI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogI2ZmZjsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNOC4xMiw1LjM0Yy0uMjgtLjY0LS44MS0xLjA5LTEuNTktMS4zNS0uNzgtLjI1LTIuMDItLjM4LTMuNzMtLjM4LS4xNCwwLS4yMS0uMTQtLjIxLS40MXMuMDctLjQxLjIxLS40MWwzLjUyLjA3YzEuOTMuMDksMy41NC4xNCw0LjgzLjE0LDEuNDMsMCwzLjItLjA0LDUuMzEtLjE0bDMuNTItLjA3Yy4wOSwwLC4xNC4xNC4xNC40MXMtLjA1LjQxLS4xNC40MWMtMS43NSwwLTMuMDQuMTQtMy44Ni40MS0uODMuMjgtMS4zOS43NS0xLjY5LDEuNDEtLjMuNjctLjQ1LDEuNjktLjQ1LDMuMDd2MzEuODFjMCwxLjM4LjE1LDIuNC40NSwzLjA3LjMuNjcuODUsMS4xMiwxLjY2LDEuMzUuOC4yMywyLjEuMzQsMy45LjM0LjA5LDAsLjE0LjE0LjE0LjQxcy0uMDUuNDEtLjE0LjQxYy0xLjUyLDAtMi42OS0uMDItMy41Mi0uMDdsLTUuMzEtLjA3LTQuOS4wN2MtLjg3LjA1LTIuMDcuMDctMy41OS4wNy0uMDksMC0uMTQtLjE0LS4xNC0uNDFzLjA0LS40MS4xNC0uNDFjMS43LDAsMi45Ni0uMTEsMy43Ni0uMzQuOC0uMjMsMS4zNi0uNjgsMS42Ni0xLjM1LjMtLjY3LjQ1LTEuNjkuNDUtMy4wN1Y4LjM4YzAtMS4zOC0uMTQtMi4zOS0uNDEtMy4wNFpNMTEuMDgsMjIuNjZoMzAuNXYxLjU5SDExLjA4di0xLjU5Wk0zOC43NSw1LjQ1Yy0uMjgtLjY3LS44My0xLjE0LTEuNjYtMS40MS0uODMtLjI4LTIuMTItLjQxLTMuODYtLjQxLS4xNCwwLS4yMS0uMTQtLjIxLS40MXMuMDctLjQxLjIxLS40MWwzLjI0LjA3YzIuMTIuMDksMy45My4xNCw1LjQ1LjE0LDEuMjksMCwyLjk0LS4wNCw0Ljk3LS4xNGwzLjUyLS4wN2MuMTQsMCwuMjEuMTQuMjEuNDFzLS4wNy40MS0uMjEuNDFjLTEuNywwLTIuOTYuMTMtMy43Ni4zOC0uODEuMjUtMS4zNS43LTEuNjIsMS4zNS0uMjguNjQtLjQxLDEuNjYtLjQxLDMuMDR2MzEuOTVjMCwxLjM4LjE0LDIuNC40MSwzLjA3LjI4LjY3LjgyLDEuMTIsMS42MiwxLjM1LjguMjMsMi4wNi4zNCwzLjc2LjM0LjE0LDAsLjIxLjE0LjIxLjQxcy0uMDcuNDEtLjIxLjQxYy0xLjQ3LDAtMi42NS0uMDItMy41Mi0uMDdsLTQuOTctLjA3LTUuNDUuMDdjLS43OC4wNS0xLjg2LjA3LTMuMjQuMDctLjE0LDAtLjIxLS4xNC0uMjEtLjQxcy4wNy0uNDEuMjEtLjQxYzEuNzksMCwzLjA5LS4xMSwzLjktLjM0LjgtLjIzLDEuMzUtLjY3LDEuNjItMS4zMS4yOC0uNjQuNDEtMS42OC40MS0zLjFWOC41MmMwLTEuMzgtLjE0LTIuNC0uNDEtMy4wN1oiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik02NS41NCw0My40M2MuMjUuNjUuNzYsMS4wOCwxLjUyLDEuMzEuNzYuMjMsMS45OS4zNCwzLjY5LjM0LjA5LDAsLjE0LjE0LjE0LjQxcy0uMDUuNDEtLjE0LjQxYy0xLjQ3LDAtMi42Mi0uMDItMy40NS0uMDdsLTQuOTctLjA3LTQuODMuMDdjLS44Ny4wNS0yLjA3LjA3LTMuNTkuMDctLjA5LDAtLjE0LS4xNC0uMTQtLjQxcy4wNS0uNDEuMTQtLjQxYzEuNjYsMCwyLjg3LS4xMSwzLjY2LS4zNC43OC0uMjMsMS4zMi0uNjgsMS42Mi0xLjM1LjMtLjY3LjQ1LTEuNjkuNDUtMy4wN1Y4LjM4YzAtMS4zOC0uMTUtMi4zOS0uNDUtMy4wNC0uMy0uNjQtLjg0LTEuMDktMS42Mi0xLjM1LS43OC0uMjUtMi0uMzgtMy42Ni0uMzgtLjA5LDAtLjE0LS4xNC0uMTQtLjQxcy4wNS0uNDEuMTQtLjQxbDMuNTkuMDdjMi4wMi4wOSwzLjYzLjE0LDQuODMuMTQsMS4zMywwLDMuMDEtLjA0LDUuMDQtLjE0bDMuMzgtLjA3Yy4wOSwwLC4xNC4xNC4xNC40MXMtLjA1LjQxLS4xNC40MWMtMS42NiwwLTIuODYuMTQtMy42Mi40MS0uNzYuMjgtMS4yOC43NS0xLjU1LDEuNDEtLjI4LjY3LS40MSwxLjY5LS40MSwzLjA3djMxLjgxYzAsMS40My4xMywyLjQ2LjM4LDMuMVoiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik04NC41Niw0My43NGMtMy43OS0yLTYuNjktNC43MS04LjY5LTguMTQtMi0zLjQzLTMtNy4yMS0zLTExLjM1LDAtNC40MiwxLjE0LTguMywzLjQyLTExLjY2LDIuMjgtMy4zNiw1LjQtNS45Niw5LjM4LTcuOCwzLjk4LTEuODQsOC40NS0yLjc2LDEzLjQyLTIuNzYsMi4zNSwwLDQuNi4yMiw2Ljc2LjY2LDIuMTYuNDQsMy45NiwxLjAyLDUuMzgsMS43Ni4zNy4xOC41OS4zNC42Ni40OHMuMTMuNTEuMTcsMS4xbC45LDguNTZjMCwuMTQtLjEzLjIzLS4zOC4yOC0uMjUuMDUtLjQtLjAyLS40NS0uMjEtLjk3LTMuMjItMi42OC01LjkyLTUuMTQtOC4xMS0yLjQ2LTIuMTgtNS42Ny0zLjI4LTkuNjMtMy4yOC0zLjQ1LDAtNi41Ni44LTkuMzEsMi40Mi0yLjc2LDEuNjEtNC45MywzLjkyLTYuNTIsNi45My0xLjU5LDMuMDEtMi4zOCw2LjUyLTIuMzgsMTAuNTJzLjgsNy43OSwyLjQyLDExLjIxYzEuNjEsMy40MywzLjk3LDYuMTgsNy4wNyw4LjI1LDMuMSwyLjA3LDYuOCwzLjEsMTEuMDcsMy4xLDMuMTMsMCw1LjMxLS42MSw2LjU1LTEuODMsMS4yNC0xLjIyLDEuODYtMy40MiwxLjg2LTYuNTksMC0yLjM5LS4xNS00LjA2LS40NS01LS4zLS45NC0uOTQtMS41OC0xLjkzLTEuOS0uOTktLjMyLTIuNzMtLjQ4LTUuMjEtLjQ4LS4yOCwwLS40MS0uMTgtLjQxLS41NSwwLS4xNC4wMy0uMjYuMS0uMzguMDctLjExLjE1LS4xNy4yNC0uMTcsMy42OC4yMyw2LjY3LjM1LDguOTcuMzVzNC41OC0uMDcsNi45Ny0uMjFjLjA5LDAsLjE3LjA2LjI0LjE3LjA3LjEyLjEuMjIuMS4zMSwwLC4zMi0uMTIuNDgtLjM1LjQ4LTEuMDYtLjA1LTEuNzkuMS0yLjIxLjQ1cy0uNjgsMS4wNS0uNzksMi4xYy0uMTIsMS4wNi0uMTcsMi45LS4xNyw1LjUyLDAsMi4wNy4wOCwzLjU0LjI0LDQuNDIuMTYuODcuMjQsMS40My4yNCwxLjY2LDAsLjI4LS4wNS40Ni0uMTQuNTUtLjA5LjA5LS4zLjE4LS42Mi4yOC01LjgsMS4yNC0xMC44MSwxLjg2LTE1LjA0LDEuODYtNS4xMSwwLTkuNTYtMS0xMy4zNS0zWiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEyMy40OSw1LjM0Yy0uMjgtLjY0LS44MS0xLjA5LTEuNTktMS4zNS0uNzgtLjI1LTIuMDItLjM4LTMuNzMtLjM4LS4xNCwwLS4yMS0uMTQtLjIxLS40MXMuMDctLjQxLjIxLS40MWwzLjUyLjA3YzEuOTMuMDksMy41NC4xNCw0LjgzLjE0LDEuNDMsMCwzLjItLjA0LDUuMzEtLjE0bDMuNTItLjA3Yy4wOSwwLC4xNC4xNC4xNC40MXMtLjA1LjQxLS4xNC40MWMtMS43NSwwLTMuMDQuMTQtMy44Ni40MS0uODMuMjgtMS4zOS43NS0xLjY5LDEuNDEtLjMuNjctLjQ1LDEuNjktLjQ1LDMuMDd2MzEuODFjMCwxLjM4LjE1LDIuNC40NSwzLjA3LjMuNjcuODUsMS4xMiwxLjY2LDEuMzUuOC4yMywyLjEuMzQsMy45LjM0LjA5LDAsLjE0LjE0LjE0LjQxcy0uMDUuNDEtLjE0LjQxYy0xLjUyLDAtMi42OS0uMDItMy41Mi0uMDdsLTUuMzEtLjA3LTQuOS4wN2MtLjg3LjA1LTIuMDcuMDctMy41OS4wNy0uMDksMC0uMTQtLjE0LS4xNC0uNDFzLjA0LS40MS4xNC0uNDFjMS43LDAsMi45Ni0uMTEsMy43Ni0uMzQuOC0uMjMsMS4zNi0uNjgsMS42Ni0xLjM1LjMtLjY3LjQ1LTEuNjkuNDUtMy4wN1Y4LjM4YzAtMS4zOC0uMTQtMi4zOS0uNDEtMy4wNFpNMTI2LjQ2LDIyLjY2aDMwLjV2MS41OWgtMzAuNXYtMS41OVpNMTU0LjEzLDUuNDVjLS4yOC0uNjctLjgzLTEuMTQtMS42Ni0xLjQxLS44My0uMjgtMi4xMi0uNDEtMy44Ni0uNDEtLjE0LDAtLjIxLS4xNC0uMjEtLjQxcy4wNy0uNDEuMjEtLjQxbDMuMjQuMDdjMi4xMi4wOSwzLjkzLjE0LDUuNDUuMTQsMS4yOSwwLDIuOTQtLjA0LDQuOTctLjE0bDMuNTItLjA3Yy4xNCwwLC4yMS4xNC4yMS40MXMtLjA3LjQxLS4yMS40MWMtMS43LDAtMi45Ni4xMy0zLjc2LjM4LS44MS4yNS0xLjM1LjctMS42MiwxLjM1LS4yOC42NC0uNDEsMS42Ni0uNDEsMy4wNHYzMS45NWMwLDEuMzguMTQsMi40LjQxLDMuMDcuMjguNjcuODIsMS4xMiwxLjYyLDEuMzUuOC4yMywyLjA2LjM0LDMuNzYuMzQuMTQsMCwuMjEuMTQuMjEuNDFzLS4wNy40MS0uMjEuNDFjLTEuNDcsMC0yLjY1LS4wMi0zLjUyLS4wN2wtNC45Ny0uMDctNS40NS4wN2MtLjc4LjA1LTEuODYuMDctMy4yNC4wNy0uMTQsMC0uMjEtLjE0LS4yMS0uNDFzLjA3LS40MS4yMS0uNDFjMS43OSwwLDMuMDktLjExLDMuOS0uMzQuOC0uMjMsMS4zNS0uNjcsMS42Mi0xLjMxLjI4LS42NC40MS0xLjY4LjQxLTMuMVY4LjUyYzAtMS4zOC0uMTQtMi40LS40MS0zLjA3WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE2OS4wNiw0NS41YzAtLjI4LjA3LS40MS4yMS0uNDEsMS42NiwwLDIuODYtLjExLDMuNjItLjM0Ljc2LS4yMywxLjI4LS42OCwxLjU1LTEuMzUuMjgtLjY3LjQxLTEuNjkuNDEtMy4wN1Y4LjM4YzAtMS4zOC0uMTQtMi4zOS0uNDEtMy4wNC0uMjgtLjY0LS43OS0xLjA5LTEuNTUtMS4zNS0uNzYtLjI1LTEuOTctLjM4LTMuNjItLjM4LS4xNCwwLS4yMS0uMTQtLjIxLS40MXMuMDctLjQxLjIxLS40MWgyOC4xNWMuNDYsMCwuNjkuMjEuNjkuNjJsLjE0LDguNjljMCwuMTQtLjEzLjIyLS4zOC4yNC0uMjUuMDItLjQtLjAzLS40NS0uMTctLjMyLTIuNTMtMS4yMi00LjQ2LTIuNjktNS44LTEuNDctMS4zMy0zLjQtMi01Ljc5LTJoLTMuNTJjLTIuMDMsMC0zLjM4LjMtNC4wNy45cy0xLjA0LDEuNzItMS4wNCwzLjM4djMxLjM5YzAsMS42Ni4zMSwyLjc4LjkzLDMuMzguNjIuNiwxLjg3LjksMy43Ni45aDQuNTVjMi41OCwwLDQuNzMtLjc3LDYuNDUtMi4zMSwxLjczLTEuNTQsMi45MS0zLjc0LDMuNTUtNi41OSwwLS4wOS4wOS0uMTQuMjgtLjE0LjE0LDAsLjI2LjAzLjM4LjEuMTEuMDcuMTcuMTMuMTcuMTctLjQ2LDMuMzEtLjY5LDYuNDItLjY5LDkuMzEsMCwuMzctLjA3LjYzLS4yMS43OXMtLjQxLjI0LS44My4yNGgtMjkuMzljLS4xNCwwLS4yMS0uMTQtLjIxLS40MVpNMTkzLjEsMjUuNjZjLTEuMTMtLjk0LTIuOTEtMS40MS01LjM1LTEuNDFoLTEwLjA3di0xLjU5aDEwLjIxYzIuMzUsMCw0LjA3LS40LDUuMTgtMS4yMSwxLjEtLjgsMS42NS0yLjA2LDEuNjUtMy43NiwwLS4wOS4xMy0uMTQuMzgtLjE0cy4zOC4wNS4zOC4xNGwtLjA3LDUuOC4wNywzLjFjLjA5LDEuNDcuMTQsMi42Mi4xNCwzLjQ1LDAsLjA5LS4xNC4xNC0uNDEuMTRzLS40MS0uMDQtLjQxLS4xNGMwLTEuOTgtLjU2LTMuNDQtMS42OS00LjM4WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIzMC43Miw1YzIuMDcsMS42MSwzLjEsMy43OSwzLjEsNi41NSwwLDIuNDgtLjcyLDQuNzUtMi4xNyw2LjgtMS40NSwyLjA1LTMuMzcsMy42Ni01Ljc2LDQuODMtMi4zOSwxLjE3LTQuOTUsMS43Ni03LjY2LDEuNzYtLjk3LDAtMi4wOS0uMDUtMy4zOC0uMTR2MTUuNTNjMCwxLjM4LjE0LDIuNC40MSwzLjA3LjI4LjY3Ljc5LDEuMTIsMS41NSwxLjM1Ljc2LjIzLDEuOTcuMzQsMy42Mi4zNC4xNCwwLC4yMS4xNC4yMS40MXMtLjA3LjQxLS4yMS40MWMtMS40MywwLTIuNTUtLjAyLTMuMzgtLjA3bC00Ljk3LS4wNy00LjgzLjA3Yy0uODguMDUtMi4wNS4wNy0zLjUyLjA3LS4xNCwwLS4yMS0uMTQtLjIxLS40MXMuMDctLjQxLjIxLS40MWMxLjY2LDAsMi44Ny0uMTEsMy42Ni0uMzQuNzgtLjIzLDEuMzEtLjY4LDEuNTktMS4zNS4yOC0uNjcuNDEtMS42OS40MS0zLjA3VjguMzhjMC0xLjM4LS4xNC0yLjM5LS40MS0zLjA0LS4yOC0uNjQtLjc5LTEuMDktMS41NS0xLjM1LS43Ni0uMjUtMS45Ny0uMzgtMy42Mi0uMzgtLjA5LDAtLjE0LS4xNC0uMTQtLjQxcy4wNC0uNDEuMTQtLjQxbDMuNDUuMDdjMi4wMi4wOSwzLjYzLjE0LDQuODMuMTQuOTcsMCwxLjg4LS4wMiwyLjc2LS4wNy44Ny0uMDQsMS42My0uMDksMi4yOC0uMTQsMS43NS0uMTQsMy4zMy0uMjEsNC43Ni0uMjEsMy44MiwwLDYuNzYuODEsOC44MywyLjQyWk0yMjYuMDMsNmMtMS40My0xLjUtMy41Mi0yLjI0LTYuMjgtMi4yNC0xLjc5LDAtMy4wNi4zMy0zLjc5LDEtLjc0LjY3LTEuMSwxLjkyLTEuMSwzLjc2djE0LjU2YzEuMzMuMTQsMi42OS4yMSw0LjA3LjIxLDMuMzEsMCw1LjY4LS43Nyw3LjExLTIuMzEsMS40My0xLjU0LDIuMTQtMy45NCwyLjE0LTcuMjEsMC0zLjY4LS43MS02LjI3LTIuMTQtNy43NlpNMjMyLjE0LDQwLjEyYy0zLjEtMy44Ni02Ljg3LTkuMjctMTEuMjgtMTYuMjFsNC42Mi0xLjQ1YzMuOTEsNS43NSw3LjIsMTAuMjQsOS44NywxMy40NiwyLjY3LDMuMjIsNS4wMiw1LjU1LDcuMDcsNywyLjA1LDEuNDUsNC4wNCwyLjE3LDUuOTcsMi4xNy4xNCwwLC4yMS4xNC4yMS40MXMtLjA3LjQxLS4yMS40MWgtOS44N2MtMS4xNSwwLTMuMjgtMS45My02LjM4LTUuOFoiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNC4xNiw5Ny44NGMuMjUuNTguNzIuOTcsMS40MSwxLjE3czEuNzcuMzEsMy4yNC4zMWg1Ljg3YzIuOSwwLDUuMy0uODYsNy4yMS0yLjU5LDEuOTEtMS43MiwzLjE4LTQuMDYsMy44My03LDAtLjE0LjEzLS4yLjM4LS4xNy4yNS4wMi4zOC4xLjM4LjI0LS40MSw0LjA1LS42Miw3LjQxLS42MiwxMC4wNywwLC4zNy0uMDguNjMtLjI0Ljc5LS4xNi4xNi0uNDMuMjQtLjc5LjI0SDIuNjdjLS4wOSwwLS4xNC0uMTQtLjE0LS40MXMuMDQtLjQxLjE0LS40MWMxLjY2LDAsMi44Ny0uMTEsMy42Ni0uMzQuNzgtLjIzLDEuMzEtLjY4LDEuNTktMS4zNS4yOC0uNjcuNDEtMS42OS40MS0zLjA3di0zMS45NWMwLTEuMzgtLjE0LTIuMzktLjQxLTMuMDQtLjI4LS42NC0uODEtMS4wOS0xLjU5LTEuMzUtLjc4LS4yNS0yLS4zOC0zLjY2LS4zOC0uMDksMC0uMTQtLjE0LS4xNC0uNDFzLjA0LS40MS4xNC0uNDFsMy40NS4wN2MyLjAyLjA5LDMuNjYuMTQsNC45LjE0czIuODctLjA0LDQuOS0uMTRsMy40NS0uMDdjLjA5LDAsLjE0LjE0LjE0LjQxcy0uMDUuNDEtLjE0LjQxYy0xLjY2LDAtMi44Ni4xMy0zLjYyLjM4LS43Ni4yNS0xLjI4LjcxLTEuNTUsMS4zOC0uMjguNjctLjQxLDEuNjktLjQxLDMuMDd2MzEuNmMwLDEuMjkuMTMsMi4yMi4zOCwyLjc5WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTQ4LjcsOTguNzRjLTMuMzQtMi01LjkxLTQuNzEtNy43My04LjE0LTEuODItMy40My0yLjczLTcuMTYtMi43My0xMS4yMSwwLTQuNzQsMS4yLTguOCwzLjU5LTEyLjE4LDIuMzktMy4zOCw1LjQ2LTUuOTIsOS4yMS03LjYyLDMuNzUtMS43LDcuNTgtMi41NSwxMS40OS0yLjU1LDQuMzcsMCw4LjIxLDEuMDIsMTEuNTIsMy4wNywzLjMxLDIuMDUsNS44NSw0Ljc1LDcuNjIsOC4xMSwxLjc3LDMuMzYsMi42Niw2LjkyLDIuNjYsMTAuNjksMCw0LjE5LTEuMSw4LjAzLTMuMzEsMTEuNTItMi4yMSwzLjUtNS4xNiw2LjI2LTguODcsOC4yOC0zLjcsMi4wMi03LjcyLDMuMDQtMTIuMDQsMy4wNHMtOC4wOC0xLTExLjQyLTNaTTcwLjQ3LDk3Ljk1YzIuMzUtMS41Miw0LjItMy43NCw1LjU1LTYuNjYsMS4zNi0yLjkyLDIuMDQtNi40LDIuMDQtMTAuNDUsMC00LjI4LS43NS04LjEtMi4yNC0xMS40NS0xLjUtMy4zNi0zLjYzLTUuOTgtNi40Mi03Ljg3LTIuNzgtMS44OC02LjAyLTIuODMtOS42OS0yLjgzLTQuNzgsMC04LjUxLDEuNjItMTEuMTgsNC44Ni0yLjY3LDMuMjQtNCw3LjcyLTQsMTMuNDIsMCw0LjM3Ljc2LDguMzMsMi4yOCwxMS44NywxLjUyLDMuNTQsMy42NSw2LjMzLDYuMzgsOC4zNSwyLjc0LDIuMDIsNS44NSwzLjA0LDkuMzUsMy4wNCwyLjk0LDAsNS41OS0uNzYsNy45NC0yLjI4WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEyNy43NCw1OC4yYzAsLjI4LS4wNy40MS0uMjEuNDEtMy4zMSwwLTUuOCwyLjA5LTcuNDUsNi4yOGwtMTQuMDgsMzUuOTVjLS4wNS4xOC0uMy4yOC0uNzYuMjhzLS43MS0uMDktLjc2LS4yOGwtMTcuMzItMzcuMzNjLS44My0xLjc1LTEuNjctMy0yLjUyLTMuNzYtLjg1LS43Ni0xLjktMS4xNC0zLjE0LTEuMTQtLjE0LDAtLjIxLS4xNC0uMjEtLjQxcy4wNy0uNDEuMjEtLjQxbDIuMTQuMDdjMS4yLjA5LDIuMzIuMTQsMy4zOC4xNCwyLjQ4LDAsNC44OC0uMDQsNy4xOC0uMTQuNzQtLjA1LDEuNjgtLjA3LDIuODMtLjA3LjE0LDAsLjIxLjE0LjIxLjQxcy0uMDcuNDEtLjIxLjQxYy0yLjg1LDAtNC4yOC44Ny00LjI4LDIuNjIsMCwuNzQuMjMsMS41Ni42OSwyLjQ4bDE0LjE1LDMwLjc3LTIuNDgsNCwxMy4zMi0zMy45NWMuMzctMS4wMS41NS0xLjg2LjU1LTIuNTUsMC0yLjI1LTEuNzUtMy4zOC01LjI0LTMuMzgtLjE0LDAtLjIxLS4xNC0uMjEtLjQxcy4wNy0uNDEuMjEtLjQxbDMuMS4wN2MxLjc1LjA5LDMuMjcuMTQsNC41NS4xNC45NywwLDIuMDUtLjA0LDMuMjQtLjE0bDIuOS0uMDdjLjE0LDAsLjIxLjE0LjIxLjQxWiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEyOS41MSwxMDAuNWMwLS4yOC4wNy0uNDEuMjEtLjQxLDEuNjYsMCwyLjg2LS4xMSwzLjYyLS4zNC43Ni0uMjMsMS4yOC0uNjgsMS41NS0xLjM1LjI4LS42Ny40MS0xLjY5LjQxLTMuMDd2LTMxLjk1YzAtMS4zOC0uMTQtMi4zOS0uNDEtMy4wNC0uMjgtLjY0LS43OS0xLjA5LTEuNTUtMS4zNS0uNzYtLjI1LTEuOTctLjM4LTMuNjItLjM4LS4xNCwwLS4yMS0uMTQtLjIxLS40MXMuMDctLjQxLjIxLS40MWgyOC4xNWMuNDYsMCwuNjkuMjEuNjkuNjJsLjE0LDguNjljMCwuMTQtLjEzLjIyLS4zOC4yNC0uMjUuMDItLjQtLjAzLS40NS0uMTctLjMyLTIuNTMtMS4yMi00LjQ2LTIuNjktNS44LTEuNDctMS4zMy0zLjQtMi01LjgtMmgtMy41MmMtMi4wMiwwLTMuMzguMy00LjA3LjlzLTEuMDQsMS43Mi0xLjA0LDMuMzh2MzEuMzljMCwxLjY2LjMxLDIuNzguOTMsMy4zOC42Mi42LDEuODcuOSwzLjc2LjloNC41NWMyLjU4LDAsNC43My0uNzcsNi40NS0yLjMxLDEuNzMtMS41NCwyLjkxLTMuNzQsMy41NS02LjU5LDAtLjA5LjA5LS4xNC4yOC0uMTQuMTQsMCwuMjYuMDMuMzguMS4xMS4wNy4xNy4xMy4xNy4xNy0uNDYsMy4zMS0uNjksNi40Mi0uNjksOS4zMSwwLC4zNy0uMDcuNjMtLjIxLjc5cy0uNDEuMjQtLjgzLjI0aC0yOS4zOWMtLjE0LDAtLjIxLS4xNC0uMjEtLjQxWk0xNTMuNTUsODAuNjZjLTEuMTMtLjk0LTIuOTEtMS40MS01LjM1LTEuNDFoLTEwLjA3di0xLjU5aDEwLjIxYzIuMzUsMCw0LjA3LS40LDUuMTctMS4yMSwxLjEtLjgsMS42Ni0yLjA2LDEuNjYtMy43NiwwLS4wOS4xMy0uMTQuMzgtLjE0cy4zOC4wNS4zOC4xNGwtLjA3LDUuOC4wNywzLjFjLjA5LDEuNDcuMTQsMi42Mi4xNCwzLjQ1LDAsLjA5LS4xNC4xNC0uNDEuMTRzLS40MS0uMDQtLjQxLS4xNGMwLTEuOTgtLjU2LTMuNDQtMS42OS00LjM4WiIvPgo8L3N2Zz4=";
const COOKIE = "hl_auth";
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days

async function tokenFor(password) {
  const data = new TextEncoder().encode("hl::" + password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
}

function heroVariant(url) {
  const hero = url.searchParams.get("hero");
  return hero === "a" || hero === "b" || hero === "c" || hero === "ref" ? hero : "";
}

function loginPage(wrong, variant) {
  const v = variant || "";
  const err = wrong ? '<p class="err">That password wasn’t right. Please try again.</p>' : '';
  const action = v ? "/__auth?hero=" + v : "/__auth";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Higher Love</title><meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--k:#000;--egg:#FAF7F1;--brown:#A07F56;--dbrown:#7E6243;--ink:#1F1B16;--mute:rgba(31,27,22,.66);--line:rgba(0,0,0,.12);--serif:"Cormorant Garamond",Georgia,serif;--sans:"Schibsted Grotesk","Helvetica Neue",Arial,sans-serif}
*{box-sizing:border-box;margin:0;padding:0}
html,body{min-height:100%}
body{font-family:var(--sans);color:var(--ink);background:#fff;display:flex;flex-direction:column;min-height:100vh;-webkit-font-smoothing:antialiased}
nav{background:var(--k);border-bottom:1px solid rgba(255,255,255,.12);padding:0 56px}
.nav-in{max-width:1180px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:92px}
.nav-in img{height:44px;width:auto;display:block}
.priv{font-weight:700;font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.6)}
header{flex:1 0 auto;padding:88px 56px 96px}
.hin{max-width:1180px;margin:0 auto;display:flex;flex-wrap:wrap;gap:56px 64px;align-items:center}
.copy{flex:1 1 520px;min-width:0;display:flex;flex-direction:column;gap:26px}
.ey{font-weight:700;font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:var(--dbrown)}
h1{font-family:var(--serif);font-weight:600;text-transform:uppercase;letter-spacing:.02em;color:var(--k);font-size:clamp(44px,5.4vw,78px);line-height:.95;text-wrap:balance}
h1 em{font-style:normal;color:var(--brown)}
.lead{font-weight:500;font-size:clamp(17px,1.3vw,20px);line-height:1.65;max-width:560px}
.date{font-weight:700;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute)}
form{flex:1 1 420px;min-width:0;max-width:520px;background:var(--egg);border:1px solid var(--line);border-top:3px solid var(--brown);padding:44px 44px 40px;display:flex;flex-direction:column;gap:22px}
.instr{font-family:var(--serif);font-weight:600;font-size:28px;line-height:1.15;color:var(--k)}
label{font-weight:700;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--dbrown);display:block;margin-bottom:8px}
input[type=password],input[type=text]{font-family:var(--sans);font-size:16px;color:var(--ink);background:#fff;border:1px solid rgba(0,0,0,.18);padding:14px 16px;width:100%}
input:focus{outline:none;border-color:var(--brown)}
.show{display:flex;align-items:center;gap:10px;font-size:13.5px;color:var(--mute)}
.show input{width:16px;height:16px;margin:0;accent-color:var(--dbrown)}
.show label{margin:0;letter-spacing:.12em;color:var(--mute)}
button{font-family:var(--sans);font-weight:700;font-size:13px;letter-spacing:.22em;text-transform:uppercase;line-height:1;padding:17px 40px;width:100%;border:1px solid var(--dbrown);background:var(--dbrown);color:#fff;cursor:pointer;transition:background .2s,border-color .2s}
button:hover{background:var(--k);border-color:var(--k)}
.err{font-size:13.5px;color:#915335}
footer{background:var(--k);border-top:1px solid rgba(255,255,255,.16);padding:48px 56px 36px}
.fin{max-width:1180px;margin:0 auto}
.ftop{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:24px}
.ftop img{height:74px;width:auto;display:block}
.fl{display:flex;gap:34px}
.fl a{font-weight:700;font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.8);text-decoration:none}
.fl a:hover{color:var(--brown)}
.fbot{border-top:1px solid rgba(255,255,255,.16);padding-top:24px;margin-top:28px;text-align:center;color:rgba(255,255,255,.55);font-size:11.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.photo{display:none}
@media(max-width:900px){nav{padding:0 24px}.nav-in{min-height:72px}.nav-in img{height:36px}header{padding:56px 24px 64px}form{padding:32px 24px 28px}footer{padding:40px 24px 28px}.ftop{justify-content:center;text-align:center}}
${gateVariantCss(v)}
</style></head><body class="${v ? "gate-" + v : ""}">
<nav><div class="nav-in"><img src="${LOGO}" alt="Higher Love"><span class="priv">Private</span></div></nav>
<header>
  <div class="hin">
    <div class="photo" aria-hidden="true"></div>
    <div class="copy">
      <span class="ey">By Application and Invitation</span>
      <h1>Finally, an intentional room <em>for men who love men.</em></h1>
      <p class="lead">A 4-day immersive retreat where you are not just seen, but fully met intellectually, emotionally, and spiritually by other men at your level.</p>
      <p class="date">Next retreat &middot; March 8 to 12, 2027</p>
    </div>
    <form method="POST" action="${action}" autocomplete="off">
      <p class="instr">If you’ve been invited, enter your password below.</p>
      ${err}
      <div><label for="pw">Password</label><input type="password" name="password" id="pw" autofocus></div>
      <div class="show"><input type="checkbox" id="pwtoggle"><label for="pwtoggle">Show password</label></div>
      <button type="submit">Enter</button>
    </form>
  </div>
</header>
<footer><div class="fin">
  <div class="ftop"><img src="${LOGO_STACKED}" alt="Higher Love"><div class="fl"><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></div></div>
  <div class="fbot">&copy; 2026 Higher Love, a Creation by Category of One Branding, LLC &middot; All Rights Reserved</div>
</div></footer>
<script>(function(){var p=document.getElementById('pw'),t=document.getElementById('pwtoggle');if(p&&t){t.addEventListener('change',function(){p.type=t.checked?'text':'password';});}})();</script>
</body></html>`;
}

function gateVariantCss(v) {
  if (!v) return "";
  return `
.gate-a,.gate-b,.gate-c,.gate-ref{background:#000}
.gate-a h1,.gate-b h1,.gate-c h1,.gate-ref h1{color:#fff;font-size:clamp(34px,3.4vw,56px)}
.gate-a .ey,.gate-b .ey,.gate-c .ey,.gate-ref .ey{color:#C4A574}
.gate-a .lead,.gate-b .lead,.gate-c .lead,.gate-ref .lead{color:rgba(255,255,255,.9)}
.gate-a .date,.gate-b .date,.gate-c .date,.gate-ref .date{color:rgba(255,255,255,.72)}
.gate-a,.gate-c,.gate-ref{position:relative}
.gate-a::before,.gate-c::before,.gate-ref::before{content:"";position:fixed;inset:0;z-index:0;background:url("/images/firepit-night.jpg") center center/cover no-repeat}
.gate-a::after,.gate-ref::after{content:"";position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse 70% 60% at 50% 42%,rgba(0,0,0,.66) 0%,rgba(0,0,0,.3) 70%),linear-gradient(180deg,rgba(0,0,0,.64) 0%,rgba(0,0,0,.4) 46%,rgba(0,0,0,.8) 100%)}
.gate-c::after{content:"";position:fixed;inset:0;z-index:0;background:linear-gradient(180deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,.28) 36%,rgba(0,0,0,.88) 100%)}
.gate-a nav,.gate-a header,.gate-a footer,.gate-c nav,.gate-c header,.gate-c footer,.gate-ref nav,.gate-ref header,.gate-ref footer{position:relative;z-index:1}
.gate-a nav,.gate-c nav,.gate-ref nav{background:transparent;border-bottom-color:transparent}
.gate-a form,.gate-c form,.gate-ref form{background:rgba(12,10,8,.78);border-color:rgba(255,255,255,.2);backdrop-filter:blur(8px)}
.gate-a .instr,.gate-b .instr,.gate-c .instr,.gate-ref .instr{color:#fff}
.gate-a label,.gate-b label,.gate-c label,.gate-ref label{color:#C4A574}
.gate-a .show,.gate-a .show label,.gate-b .show,.gate-b .show label,.gate-c .show,.gate-c .show label,.gate-ref .show,.gate-ref .show label{color:rgba(255,255,255,.75)}
.gate-a footer,.gate-c footer,.gate-ref footer{background:transparent}
.gate-b{background:#0c0a08}
.gate-b header{padding:0}
.gate-b .hin{max-width:none;min-height:calc(100dvh - 92px);display:grid;grid-template-columns:minmax(0,1.05fr) minmax(320px,.95fr);grid-template-rows:auto 1fr;gap:0;align-items:stretch}
.gate-b .photo{grid-column:1;grid-row:1 / span 2}
.gate-b .copy{grid-column:2;grid-row:1;padding:36px 48px 8px;justify-content:flex-end;gap:14px}
.gate-b form{grid-column:2;grid-row:2;max-width:none;margin:0;background:#0c0a08;border:0;padding:4px 48px 32px;justify-content:flex-start;gap:14px}
.gate-b .photo{display:block;min-height:100%;background:url("/images/firepit-night.jpg") center center/cover no-repeat;position:relative}
.gate-b .photo::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.15),rgba(0,0,0,.4))}
.gate-c header{min-height:calc(100dvh - 92px);display:flex;align-items:flex-end;padding:0 64px 48px}
.gate-c .hin{width:100%;align-items:flex-end}
.gate-c .copy{max-width:560px}
.gate-ref h1{font-size:clamp(2.4rem,5vw,3.5rem)}
@media(max-width:900px){
  .gate-a header,.gate-c header,.gate-ref header{padding:12px 16px 16px}
  .gate-a .hin,.gate-c .hin,.gate-ref .hin,.gate-b .hin{gap:12px}
  .gate-a .copy,.gate-c .copy,.gate-ref .copy,.gate-b .copy{gap:8px}
  .gate-a h1,.gate-b h1,.gate-c h1,.gate-ref h1{font-size:26px;line-height:1}
  .gate-a .lead,.gate-b .lead,.gate-c .lead,.gate-ref .lead{font-size:13.5px;line-height:1.35}
  .gate-a form,.gate-c form,.gate-ref form{padding:14px 14px 12px;gap:8px}
  .gate-a .instr,.gate-b .instr,.gate-c .instr,.gate-ref .instr{font-size:18px}
  .gate-a button,.gate-b button,.gate-c button,.gate-ref button{padding:13px 16px}
  .gate-b .hin{display:flex;flex-direction:column;min-height:0}
  .gate-b .photo{display:block;min-height:0;height:128px;order:-1}
  .gate-b .copy{padding:10px 16px 0;gap:4px;flex:none;justify-content:flex-start}
  .gate-b form{border-left:0;padding:4px 16px 10px;gap:6px}
  .gate-b h1{font-size:22px}
  .gate-b .lead{font-size:12.5px;line-height:1.28}
  .gate-b .instr{font-size:16px}
  .gate-b button{padding:11px 14px}
  .gate-c header{min-height:calc(100dvh - 64px);align-items:flex-end;padding:12px 16px 18px}
  .gate-a nav,.gate-b nav,.gate-c nav,.gate-ref nav{padding:0 16px}
  .gate-a .nav-in,.gate-b .nav-in,.gate-c .nav-in,.gate-ref .nav-in{min-height:52px}
  .gate-a .nav-in img,.gate-b .nav-in img,.gate-c .nav-in img,.gate-ref .nav-in img{height:26px}
}
`;
}

function loginResponse(wrong, variant) {
  return new Response(loginPage(wrong, variant), { status: 401, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // /investment was merged into the homepage
    if (url.pathname === "/investment" || url.pathname.startsWith("/investment/")) {
      return Response.redirect(new URL("/", url).toString(), 301);
    }

    // Legal pages stay public (linked from the gate's footer).
    // The Havan hero photo is public so the gate mockups can paint it.
    if (url.pathname === "/privacy.html" || url.pathname === "/terms.html" || url.pathname === "/images/firepit-night.jpg") {
      return env.ASSETS.fetch(request);
    }

    const password = env.CFP_PASSWORD;
    const variant = heroVariant(url);
    if (password) {
      const token = await tokenFor(password);

      if (request.method === "POST" && url.pathname === "/__auth") {
        let entered = "";
        try { const form = await request.formData(); entered = (form.get("password") || "").toString(); } catch (e) {}
        if (entered === password) {
          return new Response(null, { status: 302, headers: {
            "Location": variant ? "/?hero=" + variant : "/",
            "Set-Cookie": COOKIE + "=" + token + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=" + MAX_AGE
          }});
        }
        return loginResponse(true, variant);
      }

      const cookie = request.headers.get("Cookie") || "";
      const authed = cookie.split(/;\s*/).indexOf(COOKIE + "=" + token) !== -1;
      if (!authed) return loginResponse(false, variant);
    }

    // Authed (or gate off) -> serve the static site
    return env.ASSETS.fetch(request);
  }
};
