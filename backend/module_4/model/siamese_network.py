# import torch
# import torch.nn as nn

# class SiameseNetwork(nn.Module):
#     def __init__(self):
#         super(SiameseNetwork, self).__init__()

#         self.net = nn.Sequential(
#             nn.Linear(5, 64),
#             nn.ReLU(),
#             nn.Linear(64, 32),
#             nn.ReLU(),
#             nn.Linear(32, 16)
#         )

#     def forward_once(self, x):
#         return self.net(x)

#     def forward(self, x1, x2):
#         return self.forward_once(x1), self.forward_once(x2)











# import torch
# import torch.nn as nn
# import torch.nn.functional as F

# class SiameseNetwork(nn.Module):
#     def __init__(self):
#         super(SiameseNetwork, self).__init__()

#         self.net = nn.Sequential(
#             nn.Linear(5, 64),
#             nn.ReLU(),
#             nn.Linear(64, 32),
#             nn.ReLU(),
#             nn.Linear(32, 16)
#         )

#     def forward_once(self, x):
#         return self.net(x)

#     def forward(self, x1, x2):
#         out1 = self.forward_once(x1)
#         out2 = self.forward_once(x2)

#         # 🔥 similarity (cosine similarity)
#         similarity = F.cosine_similarity(out1, out2)

#         return similarity\









import torch
import torch.nn as nn
import torch.nn.functional as F

class SiameseNetwork(nn.Module):
    def __init__(self, input_size=4):   # ✅ FIXED (flexible)
        super(SiameseNetwork, self).__init__()

        self.net = nn.Sequential(
            nn.Linear(input_size, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 16)
        )

    def forward_once(self, x):
        return self.net(x)

    def forward(self, x1, x2):
        out1 = self.forward_once(x1)
        out2 = self.forward_once(x2)

        # 🔥 cosine similarity
        similarity = F.cosine_similarity(out1, out2)

        return similarity